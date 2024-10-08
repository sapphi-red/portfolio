import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import './transitions.css'
import CustomLayout from './CustomLayout.vue'
import TopLayout from './TopLayout.vue'
import ArticleTitle from './components/ArticleTitle.vue'
import EmbedXPost from './components/EmbedXPost.vue'

export default {
  extends: DefaultTheme,
  Layout: CustomLayout,
  enhanceApp({ app }) {
    app.component('TopLayout', TopLayout)
    app.component('ArticleTitle', ArticleTitle)
    app.component('EmbedXPost', EmbedXPost)
  }
} satisfies Theme
