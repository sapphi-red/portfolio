import { UserConfig } from 'vite'
import path from 'path'
import PurgeIcons from 'vite-plugin-purge-icons'
import { ViteToml } from 'vite-plugin-toml'
// @ts-expect-error no d.ts but ok
import brotli from 'rollup-plugin-brotli'

const srcPath = path.resolve(__dirname, 'src').replace(/\\/g, '/')

const config: UserConfig = {
  alias: {
    '/@/': srcPath
  },
  cssPreprocessOptions: {
    scss: {
      additionalData: `@import "${srcPath}/styles/common.scss";`
    }
  },
  plugins: [PurgeIcons(), ViteToml()],
  rollupInputOptions: {
    pluginsPostBuild: [brotli()]
  }
}

export default config
