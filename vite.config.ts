import { defineConfig } from 'vite'
import path from 'path'
import Vue from '@vitejs/plugin-vue'
import PurgeIcons from 'vite-plugin-purge-icons'
import { ViteToml } from 'vite-plugin-toml'

export default defineConfig({
  resolve: {
    alias: {
      '/@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use 'sass:math';
          @import "/@/styles/common.scss";
        `
      }
    }
  },
  plugins: [Vue(), PurgeIcons(), ViteToml()],
  ssgOptions: {
    script: 'defer'
  }
})
