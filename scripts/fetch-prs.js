import fetch from 'node-fetch'
import fs from 'fs/promises'
import { ignoreRepoUser, ignorePRs } from './fetch-prs-config.js'

const URL_PATH = 'https://api.github.com/search/issues'

const RAW_DATA_PATH = new URL('../bin/prs_raw.json', import.meta.url)
const DATA_PATH = new URL('../src/assets/prs.json', import.meta.url)

const fetchPRs = async page => {
  const url = new URL(URL_PATH)
  const params = url.searchParams
  params.set('q', 'author:sapphi-red is:pr is:merged')
  params.set('sort', 'updated')
  params.set('per_page', 100)
  params.set('page', page)

  const res = await fetch(url)
  const data = await res.json()
  return data
}

const fetchAllPRData = async () => {
  let total = null
  let i = 1
  const prs = []
  const fetchedAt = new Date()

  while (total > 0 || total === null) {
    const data = await fetchPRs(i)
    prs.push(...data.items)

    i++
    if (total === null) {
      total = data.total_count
    }
    total -= data.items.length
  }

  return { prs, fetchedAt }
}

const prDataMapToPRs = prDataMap => {
  const prs = [...prDataMap.values()]
  prs.sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at))
  return prs
}

const fetchDiffPRData = async (oldPRs, lastFetchedAt) => {
  let i = 1
  let wasNotEmpty = true
  const fetchedAt = new Date()
  const lastFetchedAtNum = Date.parse(lastFetchedAt)
  const prDataMap = new Map(oldPRs.map(pr => [pr.pull_request.html_url, pr]))

  while (wasNotEmpty) {
    const data = await fetchPRs(i)
    if (data.items === 0) {
      wasNotEmpty = false
    }

    for (const pr of data.items) {
      if (Date.parse(pr.updated_at) < lastFetchedAtNum) {
        return { prs: prDataMapToPRs(prDataMap), fetchedAt }
      }
      prDataMap.set(pr.pull_request.html_url, pr)
    }

    i++
  }

  return { prs: prDataMapToPRs(prDataMap), fetchedAt }
}

const toPRSimpleData = pr => {
  // cf. https://github.com/traPtitech/traPortfolio/pull/8
  const url = pr.pull_request.html_url
  const title = pr.title
  const paths = new URL(url).pathname.split('/')
  // eslint-disable-next-line prettier/prettier
  const [, repoUser, repoName, /* pull */, prId] = paths
  const label = `${repoUser}/${repoName}#${prId}`
  return {
    url,
    title,
    label,
    repoUser,
    repoName,
    prId: +prId
  }
}

const groupByRepo = (prs, each) => {
  const repos = {}
  for (const pr of prs) {
    const repo = `${pr.repoUser}/${pr.repoName}`
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

const shrinkData = pr => {
  return {
    url: pr.url,
    title: pr.title,
    prId: pr.prId
  }
}

const rawToData = rawData => {
  const transformedData = rawData.prs
    .map(pr => toPRSimpleData(pr))
    .filter(
      pr => !ignoreRepoUser.includes(pr.repoUser) && !ignorePRs.includes(pr.url)
    )

  const groupedData = groupByRepo(transformedData, shrinkData)

  return {
    repos: groupedData,
    fetchedAt: rawData.fetchedAt
  }
}

const fetchAndWriteDiffPRRawData = async () => {
  const oldRawData = JSON.parse(await fs.readFile(RAW_DATA_PATH, 'utf-8'))
  const newRawData = await fetchDiffPRData(oldRawData.prs, oldRawData.fetchedAt)
  await fs.writeFile(RAW_DATA_PATH, JSON.stringify(newRawData), 'utf-8')
}

const fetchAndWriteAllPRRawData = async () => {
  const rawData = await fetchAllPRData()
  await fs.writeFile(RAW_DATA_PATH, JSON.stringify(rawData), 'utf-8')
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
