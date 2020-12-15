<template>
  <div v-if="articles.length > 0">
    <h3>リンク</h3>
    <ul>
      <li v-for="article in articles" :key="article.link">
        <a :href="article.link">{{ article.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Article } from '/@/assets/works'

export default defineComponent({
  name: 'WorkArticles',
  props: {
    articles: {
      type: Array as PropType<Article[]>,
      required: true
    }
  }
})
</script>

<style lang="scss" module>
.container {
}
</style>
