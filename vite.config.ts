import { UserConfig, Plugin } from 'vite'
import Vue from '@vitejs/plugin-vue'
import PurgeIcons from 'vite-plugin-purge-icons'
import { ViteToml } from 'vite-plugin-toml'
// @ts-expect-error prevent installing @types/node
import url from 'url'

declare const process: { env: Record<string, string> }
declare global {
  interface ImportMeta {
    url: string
  }
}
const srcPath = url
  .fileURLToPath(new URL('./src', import.meta.url))
  .replace(/\\/g, '/')

const preloadPlugin: Plugin = {
  name: 'preload',
  transformIndexHtml(html, ctx) {
    if (ctx.server) return

    const cssMatch = [...html.matchAll(/<link rel="stylesheet" href="(.+)">/g)]
    if (cssMatch.length > 0) {
      const cssPreloads = cssMatch
        .map(m => m[1])
        .map(src => `<link rel="preload" href="${src}" as="style">`)
      html = html.replace(/<meta charset=.+\/>/, `$&\n${cssPreloads}`)
    }
    return html
  }
}

const config: UserConfig = {
  alias: {
    '/@': srcPath
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${srcPath}/styles/common.scss";`
      }
    }
  },
  plugins: [
    Vue({
      ssr: !!process.env.VITE_SSG
    }),
    PurgeIcons(),
    ViteToml(),
    preloadPlugin
  ]
}

export default config
