import { UserConfig, Plugin } from 'vite'
// @ts-expect-error: prevent installing @types/node
import path from 'path'
import Vue from '@vitejs/plugin-vue'
import PurgeIcons from 'vite-plugin-purge-icons'
import { ViteToml } from 'vite-plugin-toml'

declare const process: { env: Record<string, string> }
declare const __dirname: string
const srcPath = path.resolve(__dirname, 'src').replace(/\\/g, '/')

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
