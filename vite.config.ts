import { defineConfig } from 'vite'
import path from 'path'
import Vue from '@vitejs/plugin-vue'
import PurgeIcons from 'vite-plugin-purge-icons'
import { ViteToml } from 'vite-plugin-toml'

const srcPath = path.resolve(__dirname, 'src').replace(/\\/g, '/')

export default defineConfig({
  resolve: {
    alias: {
      '/@': srcPath
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use 'sass:math';
@import "${srcPath}/styles/common.scss";
`
      }
    }
  },
  plugins: [Vue(), PurgeIcons(), ViteToml()],
  ssgOptions: {
    script: 'defer'
  }
})
