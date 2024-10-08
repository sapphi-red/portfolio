import { defineConfig, type HeadConfig } from 'vitepress'
import Icons from 'unplugin-icons/vite'
import { ViteToml } from 'vite-plugin-toml'
import { dateToDateString } from '../common/date'

const host = 'https://green.sapphi.red/'

export default defineConfig({
  title: 'green.sapphi.red',
  description: "sapphi-red's portfolio.",
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/sapphi-red.png' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Atma&display=block'
      }
    ],
    [
      'link',
      {
        rel: 'preconnect dns-prefetch',
        href: 'https://fonts.gstatic.com/',
        crossorigin: ''
      }
    ],
    ['link', { rel: 'me', href: 'https://m.webtoo.ls/@sapphi_red' }],
    ['meta', { property: 'og:site_name', content: 'green.sapphi.red' }],
    ['meta', { name: 'twitter:site', content: '@sapphi_red' }]
  ],
  cleanUrls: true,
  srcDir: './src',
  outDir: './dist',
  // markdown: {},
  vite: {
    plugins: [
      Icons({
        scale: 1,
        defaultClass: 'icon'
      }),
      ViteToml()
    ]
  },
  transformPageData(pageData) {
    const head: HeadConfig[] = (pageData.frontmatter.head ??= [])

    head.push(['meta', { property: 'og:title', content: pageData.title }])
    head.push([
      'meta',
      { property: 'og:description', content: pageData.description }
    ])
    head.push([
      'meta',
      {
        property: 'og:url',
        content:
          host + pageData.relativePath.replace(/(?:(^|\/)index)?\.md$/, '$1')
      }
    ])

    if (pageData.filePath.startsWith('blog/')) {
      head.push(['meta', { property: 'og:type', content: 'article' }])
      const published: Date = pageData.frontmatter.date
      head.push([
        'meta',
        {
          property: 'article:published_time',
          content: dateToDateString(published)
        }
      ])

      const image = (
        pageData.frontmatter.ogpImage || '/ogp-image/fallback.png'
      ).replace(/^\//, '')
      head.push([
        'meta',
        { name: 'twitter:card', content: 'summary_large_image' }
      ])
      head.push(['meta', { name: 'twitter:image', content: host + image }])
      head.push(['meta', { property: 'og:image', content: host + image }])
    } else {
      const image = 'ogp-image/fallback.png'
      head.push(['meta', { name: 'twitter:card', content: 'summary' }])
      head.push(['meta', { name: 'twitter:image', content: host + image }])
      head.push(['meta', { property: 'og:image', content: host + image }])
    }
  },
  themeConfig: {
    nav: [
      { text: 'about', link: '/about' },
      { text: 'blog', link: '/blog' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/sapphi-red' },
      { icon: 'twitter', link: 'https://twitter.com/sapphi_red' },
      { icon: 'mastodon', link: 'https://elk.zone/m.webtoo.ls/@sapphi_red' }
    ]
  }
})
