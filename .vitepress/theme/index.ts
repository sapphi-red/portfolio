import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import './transitions.css'
import TopLayout from './TopLayout.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('TopLayout', TopLayout)
  }
} satisfies Theme
