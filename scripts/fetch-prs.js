/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const fetch = require('node-fetch')
const fs = require('fs').promises
const path = require('path')

const URL_PATH = 'https://api.github.com/search/issues'
const RAW_DATA_PATH = path.resolve(__dirname, '../public/prs_raw.json')
const DATA_PATH = path.resolve(__dirname, '../src/assets/prs.json')

const ignoreRepoUser = ['traPtitech', 'sapphi-red', 'FujishigeTemma']

const fetchPRs = async page => {
  const params = new URLSearchParams()
  params.set('q', 'author:sapphi-red is:pr is:merged')
  params.set('sort', 'created')
  params.set('per_page', 100)
  params.set('page', page)

  const res = await fetch(`${URL_PATH}?${params.toString()}`)
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

const fetchDiffPRData = async (oldPRs, lastUrl) => {
  let i = 1
  const prs = []
  let wasNotEmpty = true
  const fetchedAt = new Date()

  while (wasNotEmpty) {
    const data = await fetchPRs(i)
    if (data.items === 0) {
      wasNotEmpty = false
    }

    for (const pr of data.items) {
      if (pr.pull_request.html_url === lastUrl) {
        return { prs: prs.concat(oldPRs), fetchedAt }
      }
      prs.push(pr)
    }

    i++
  }

  return { prs: prs.concat(oldPRs), fetchedAt }
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

const groupByRepo = prs => {
  const repos = {}
  for (const pr of prs) {
    const repo = `${pr.repoUser}/${pr.repoName}`
    if (repos[repo] === undefined) {
      repos[repo] = []
    }
    repos[repo].push(pr)
  }
  for (const repo of Object.keys(repos)) {
    repos[repo].sort((a, b) => b.prId - a.prId)
  }
  return Object.entries(repos)
}

const rawToData = rawData => {
  const transformedData = rawData.prs
    .map(pr => toPRSimpleData(pr))
    .filter(pr => !ignoreRepoUser.includes(pr.repoUser))

  const groupedData = groupByRepo(transformedData)

  return {
    repos: groupedData,
    fetchedAt: rawData.fetchedAt
  }
}

const fetchAndWriteDiffPRRawData = async () => {
  const oldRawData = JSON.parse(await fs.readFile(RAW_DATA_PATH, 'utf-8'))
  const lastUrl = oldRawData.prs[0].pull_request.html_url
  const newRawData = await fetchDiffPRData(oldRawData.prs, lastUrl)
  await fs.writeFile(RAW_DATA_PATH, JSON.stringify(newRawData), 'utf-8')
}

const fetchAndWriteAllPRRawData = async () => {
  const rawData = await fetchAllPRData()
  await fs.writeFile(RAW_DATA_PATH, JSON.stringify(rawData), 'utf-8')
}

const readRawDataAndWriteData = async () => {
  const rawDataText = await fs.readFile(RAW_DATA_PATH, 'utf-8')
  const rawData = JSON.parse(rawDataText)
  const outputData = rawToData(rawData)
  await fs.writeFile(DATA_PATH, JSON.stringify(outputData), 'utf-8')
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
      await await readRawDataAndWriteData()
      break
  }
})()
