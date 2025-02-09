import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import './transitions.css'
import CustomLayout from './CustomLayout.vue'
import TopLayout from './TopLayout.vue'
import EmbedXPost from './components/EmbedXPost.vue'

export default {
  extends: DefaultTheme,
  Layout: CustomLayout,
  enhanceApp({ app }) {
    app.component('TopLayout', TopLayout)
    app.component('EmbedXPost', EmbedXPost)
  }
} satisfies Theme
