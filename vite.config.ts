import { defineConfig } from 'vite'
import path from 'path'
import Vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
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
    },
    devSourcemap: true
  },
  plugins: [
    Vue(),
    Icons({
      scale: 1,
      defaultClass: 'icon'
    }),
    ViteToml()
  ]
})
