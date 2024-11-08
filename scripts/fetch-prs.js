/* global process */
import fs from 'fs/promises'
import { ignoreRepoUser, ignorePRs, ignoreRepo } from './fetch-prs-config.js'
import { Octokit } from '@octokit/core'
import { paginateGraphQL } from '@octokit/plugin-paginate-graphql'

const RAW_DATA_PATH = new URL('../bin/prs_raw.json', import.meta.url)
const DATA_PATH = new URL('../src/assets/prs.json', import.meta.url)

/**
 * @typedef {{
 *   title: string
 *   repository: {
 *     owner: {
 *       login: string
 *     }
 *     name: string
 *   }
 *   number: number
 *   additions: number
 *   deletions: number
 *   files: {
 *     nodes: {
 *       path: string
 *     }[]
 *   }
 *   mergedAt: string
 *   updatedAt: string
 * }} RawPullRequest
 */

/**
 * @typedef {{
 *   title: string
 *   repository: {
 *     owner: string
 *     name: string
 *   }
 *   number: number
 *   additions: number
 *   deletions: number
 *   files: string[]
 *   mergedAt: string
 *   updatedAt: string
 * }} PullRequest
 */

/**
 * @typedef {{
 *   title: string
 *   url: string
 *   prId: number
 * }} SimplePullRequest
 */

/**
 * @param {RawPullRequest} rawPr
 * @returns {PullRequest}
 */
const normalizePullRequest = rawPr => ({
  title: rawPr.title,
  repository: {
    owner: rawPr.repository.owner.login,
    name: rawPr.repository.name
  },
  number: rawPr.number,
  additions: rawPr.additions,
  deletions: rawPr.deletions,
  files: rawPr.files.nodes.map(node => node.path),
  mergedAt: rawPr.mergedAt,
  updatedAt: rawPr.updatedAt
})

/**
 * @param {PullRequest} pr
 * @returns {string}
 */
const getPrKey = pr =>
  `${pr.repository.owner}/${pr.repository.name}#${pr.number}`

/**
 * @param {Octokit & import('@octokit/plugin-paginate-graphql').paginateGraphQLInterface} octokit
 * @param {Date | undefined} updatedAtAfter
 * @param {Date | undefined} updatedAtBefore
 * @returns {AsyncGenerator<PullRequest>}
 */
const fetchPullRequests = async function* (
  octokit,
  updatedAtAfter,
  updatedAtBefore
) {
  /** @type {AsyncIterable<{ search: { nodes: RawPullRequest[] } }>} */
  const results = octokit.graphql.paginate.iterator(
    `
    query pullRequests($cursor: String, $q: String!) {
      search(
        first: 100
        after: $cursor
        query: $q
        type: ISSUE
      ) {
        nodes {
          ... on PullRequest {
            title
            repository {
              owner {
                login
              }
              name
            }
            number
            additions
            deletions
            files(first: 20) {
              nodes {
                path
              }
            }
            mergedAt
            updatedAt
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `,
    {
      q:
        `author:sapphi-red is:public is:pr is:merged sort:updated` +
        (updatedAtAfter
          ? updatedAtBefore
            ? ` updated:${updatedAtAfter.toISOString()}..${updatedAtBefore.toISOString()}`
            : ` updated:>=${updatedAtAfter.toISOString()}`
          : updatedAtBefore
            ? ` updated:<=${updatedAtBefore.toISOString()}`
            : '')
    }
  )

  let i = 0
  for await (const result of results) {
    for (const node of result.search.nodes) {
      yield normalizePullRequest(node)
    }

    // GitHub is unstable when returning later pages
    // give up on the third page even if the next page exists
    if (i >= 3) return
    i++
  }
}

/**
 * @param {Date | undefined} updatedAtAfter
 * @returns {AsyncGenerator<PullRequest>}
 */
const fetchPullRequestsContinuous = async function* (updatedAtAfter) {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN is not defined')
  }

  const OctokitWithGraphQLPaginate = Octokit.plugin(paginateGraphQL)
  const octokit = new OctokitWithGraphQLPaginate({
    auth: process.env.GITHUB_TOKEN
  })

  /** @type {Date | undefined} */
  let updatedAtBefore
  /** @type {string | undefined} */
  let lastPrKey
  while (true) {
    const items = fetchPullRequests(octokit, updatedAtAfter, updatedAtBefore)

    /** @type {PullRequest | undefined} */
    let lastPr
    for await (const pr of items) {
      if (lastPrKey !== undefined) {
        const prKey = getPrKey(pr)
        if (lastPrKey === prKey) {
          lastPrKey = undefined
        }
        continue
      }

      yield pr
      lastPr = pr
    }

    if (!lastPr) {
      return
    }

    updatedAtBefore = new Date(lastPr.updatedAt)
    lastPrKey = getPrKey(lastPr)
  }
}

/**
 * @template T
 * @param {AsyncIterable<T>} asyncIterable
 * @returns {Promise<T[]>}
 */
const arrayFromAsync = async function (asyncIterable) {
  const array = []
  for await (const item of asyncIterable) {
    array.push(item)
  }
  return array
}

/**
 * @param {PullRequest[]} oldPullRequests
 * @param {PullRequest[]} newPullRequests
 * @returns {PullRequest[]}
 */
const mergePullRequests = (oldPullRequests, newPullRequests) => {
  const mergedPullRequests = [...oldPullRequests].reverse()
  const mergedPullRequestKeys = new Set(
    mergedPullRequests.map(pr => getPrKey(pr))
  )
  for (let i = newPullRequests.length - 1; i >= 0; i--) {
    const newPullRequest = newPullRequests[i]
    const prKey = getPrKey(newPullRequest)
    if (mergedPullRequestKeys.has(prKey)) continue

    mergedPullRequests.push(newPullRequest)
    mergedPullRequestKeys.add(prKey)
  }
  return mergedPullRequests.reverse()
}

const fetchAndWriteDiffPRRawData = async () => {
  /** @type {PullRequest[]} */
  const oldPullRequests = JSON.parse(await fs.readFile(RAW_DATA_PATH, 'utf-8'))
  if (oldPullRequests.length === 0) throw new Error('oldPullRequests is empty')

  const knownUpdatedAt = new Date(oldPullRequests[0].updatedAt)
  const fetchedPullRequests = await arrayFromAsync(
    fetchPullRequestsContinuous(knownUpdatedAt)
  )
  const pullRequests = mergePullRequests(oldPullRequests, fetchedPullRequests)
  await fs.writeFile(RAW_DATA_PATH, JSON.stringify(pullRequests), 'utf-8')
}

const fetchAndWriteAllPRRawData = async () => {
  const pullRequests = await arrayFromAsync(fetchPullRequestsContinuous())
  await fs.writeFile(RAW_DATA_PATH, JSON.stringify(pullRequests), 'utf-8')
}

/**
 * @param {PullRequest[]} prs
 * @param {(pr: PullRequest) => SimplePullRequest} each
 * @returns {[string, SimplePullRequest[]][]}
 */
const groupByRepo = (prs, each) => {
  /** @type {Record<string, SimplePullRequest[]>} */
  const repos = {}
  for (const pr of prs) {
    const repo = `${pr.repository.owner}/${pr.repository.name}`
    if (repos[repo] === undefined) {
      repos[repo] = []
    }
    repos[repo].push(each(pr))
  }
  for (const repo of Object.keys(repos)) {
    repos[repo].sort((a, b) => b.prId - a.prId)
  }
  return Object.entries(repos)
}

/**
 * @param {PullRequest} pr
 * @returns {SimplePullRequest}
 */
const shrinkData = pr => {
  return {
    url: `https://github.com/${pr.repository.owner}/${pr.repository.name}/pull/${pr.number}`,
    title: pr.title,
    prId: pr.number
  }
}

const htmlReplaceRe = /[&<>"]/g
const htmlReplaceMap = new Map([
  ['&', '&amp;'],
  ['<', '&lt;'],
  ['>', '&gt;'],
  ['"', '&quot;']
])
const escapeHtml = html => {
  if (htmlReplaceRe.test(html)) {
    return html.replace(htmlReplaceRe, ch => htmlReplaceMap.get(ch))
  }
  return html
}

/**
 * @param {PullRequest} pr
 * @returns {PullRequest}
 */
const renderTitle = pr => {
  const title = pr.title
  let newTitle = ''
  if (pr.title.includes('`')) {
    let oldBacktickPos1 = 0 // `があった場所+1の位置
    let newBacktickPos = title.indexOf('`')
    let isClose = false
    while (newBacktickPos !== -1) {
      newTitle += escapeHtml(title.slice(oldBacktickPos1, newBacktickPos))
      newTitle += isClose ? '</code>' : '<code>'

      isClose = !isClose
      oldBacktickPos1 = newBacktickPos + 1
      newBacktickPos = title.indexOf('`', oldBacktickPos1)
    }
    newTitle += escapeHtml(title.slice(oldBacktickPos1))
  } else {
    newTitle = escapeHtml(title)
  }

  return {
    ...pr,
    title: newTitle
  }
}

/**
 * @param {PullRequest[]} pullRequests
 */
const rawToData = pullRequests => {
  const transformedData = pullRequests
    .filter(
      pr =>
        !ignoreRepoUser.includes(pr.repository.owner) &&
        !ignoreRepo.includes(`${pr.repository.owner}/${pr.repository.name}`) &&
        !ignorePRs.includes(
          `https://github.com/${pr.repository.owner}/${pr.repository.name}/pull/${pr.number}`
        )
    )
    .map(renderTitle)
    .sort((a, b) => Date.parse(b.mergedAt) - Date.parse(a.mergedAt))

  const groupedData = groupByRepo(transformedData, shrinkData)

  return {
    repos: groupedData,
    fetchedAt: pullRequests[0].updatedAt
  }
}

const formatJson = json => JSON.stringify(json, undefined, 2)

const readRawDataAndWriteData = async () => {
  const rawDataText = await fs.readFile(RAW_DATA_PATH, 'utf-8')
  const rawData = JSON.parse(rawDataText)
  const outputData = rawToData(rawData)
  await fs.writeFile(DATA_PATH, formatJson(outputData), 'utf-8')
}

const createDataWithCache = async () => {
  await fetchAndWriteDiffPRRawData()
  await readRawDataAndWriteData()
}

const createDataWithoutCache = async () => {
  await fetchAndWriteAllPRRawData()
  await readRawDataAndWriteData()
}

;(async () => {
  const args = process.argv
  const arg = args.length < 3 ? 'withCache' : args[2]

  switch (arg) {
    case 'withCache':
      await createDataWithCache()
      break
    case 'withoutCache':
      await createDataWithoutCache()
      break
    case 'fromCache':
      await readRawDataAndWriteData()
      break
  }
})()
