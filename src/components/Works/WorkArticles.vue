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

<script lang="ts" setup>
import type { Article } from '/@/assets/works'

defineProps<{
  articles: Article[]
}>()
</script>

<style lang="scss" module>
.container {
}
</style>
