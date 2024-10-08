import path from 'path'
import { writeFileSync } from 'fs'
import { Feed } from 'feed'
import { createContentLoader, type SiteConfig } from 'vitepress'

const baseUrl = 'https://green.sapphi.red/'

export async function genFeed(config: SiteConfig) {
  const feed = new Feed({
    title: 'green.sapphi.red',
    description: 'A blog by sapphi-red.',
    author: {
      name: 'sapphi-red',
      link: 'https://x.com/sapphi_red'
    },
    id: baseUrl,
    link: baseUrl,
    language: 'en',
    image: 'https://green.sapphi.red/sapphi-red.png',
    favicon: `${baseUrl}/favicon.ico`,
    copyright: 'Copyright (c) 2024 sapphi-red'
  })

  const posts = await createContentLoader('blog/*.md', {
    excerpt: true,
    render: true
  }).load()

  posts.sort(
    (a, b) =>
      +new Date(b.frontmatter.date as string) -
      +new Date(a.frontmatter.date as string)
  )

  for (const { url, excerpt, frontmatter, html } of posts) {
    feed.addItem({
      title: frontmatter.title,
      id: `${baseUrl}${url}`,
      link: `${baseUrl}${url}`,
      description: excerpt,
      content: html?.replaceAll('&ZeroWidthSpace;', ''),
      date: frontmatter.date,
      image: baseUrl + frontmatter.ogpImage.replace(/^\//, '')
    })
  }

  writeFileSync(path.join(config.outDir, 'feed.rss'), feed.rss2())
}
