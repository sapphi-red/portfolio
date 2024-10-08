import { defineConfig } from 'vitepress'
import Icons from 'unplugin-icons/vite'
import { ViteToml } from 'vite-plugin-toml'

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
    ['link', { rel: 'me', href: 'https://m.webtoo.ls/@sapphi_red' }]
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
