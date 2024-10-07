import { defineConfig } from 'vitepress'

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
    [
      'script',
      {
        src: 'https://platform.twitter.com/widgets.js',
        charset: 'utf-8',
        async: ''
      }
    ]
  ],
  cleanUrls: true,
  srcDir: './src',
  // markdown: {},
  // vite: {},
  themeConfig: {
    nav: [
      { text: 'about', link: '/about' },
      { text: 'blog', link: '/blog' }
    ]
  }
})
