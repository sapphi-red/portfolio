import path from 'path'
import { writeFileSync } from 'fs'
import { Feed } from 'feed'
import { createContentLoader, type SiteConfig } from 'vitepress'
import { execSync } from 'node:child_process'

const baseUrl = 'https://green.sapphi.red/'

export async function genFeed(config: SiteConfig) {
  const lastUpdatedTimestampString = execSync(
    'git log -1 --pretty="format:%ct" src/blog',
    { encoding: 'utf-8' },
  ).trim()
  const lastUpdated = new Date(parseInt(lastUpdatedTimestampString, 10) * 1000)

  const feed = new Feed({
    title: 'green.sapphi.red',
    description: 'A blog by sapphi-red.',
    author: {
      name: 'sapphi-red',
      link: 'https://x.com/sapphi_red',
    },
    id: baseUrl,
    link: baseUrl,
    language: 'en',
    image: 'https://green.sapphi.red/sapphi-red.png',
    favicon: `${baseUrl}/favicon.ico`,
    copyright: 'Copyright (c) 2024 sapphi-red',
    updated: lastUpdated,
  })

  const posts = await createContentLoader('blog/*.md', {
    excerpt: true,
    render: true,
  }).load()

  posts.sort(
    (a, b) =>
      +new Date(b.frontmatter.date as string) -
      +new Date(a.frontmatter.date as string),
  )

  for (const { url, excerpt, frontmatter } of posts) {
    feed.addItem({
      title: frontmatter.title,
      id: `${baseUrl.replace(/\/$/, '')}${url}`,
      link: `${baseUrl.replace(/\/$/, '')}${url}`,
      description: excerpt,
      date: frontmatter.date,
      image: baseUrl + frontmatter.ogpImage.replace(/^\//, ''),
    })
  }

  writeFileSync(path.join(config.outDir, 'feed.rss'), feed.rss2())
}
