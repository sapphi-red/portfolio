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
    ['link', { rel: 'me', href: 'https://m.webtoo.ls/@sapphi_red' }]
  ],
  cleanUrls: true,
  srcDir: './src',
  // markdown: {},
  // vite: {},
  themeConfig: {
    nav: [
      { text: 'about', link: '/about' },
      { text: 'skills', link: '/skills' },
      { text: 'experiences', link: '/experiences' },
      { text: 'works', link: '/works' }
    ]
  }
})
