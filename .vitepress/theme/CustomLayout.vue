<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import NotFound from './components/internal/NotFound.vue'
import ArticleTitle from './components/ArticleTitle.vue'
import ArticleFooter from './components/ArticleFooter.vue'
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import { data as posts } from './components/posts.data.js'

const route = useRoute()

const isBlogPost = computed(() => posts.some(p => p.url === route.path))
</script>

<template>
  <DefaultTheme.Layout>
    <template #not-found>
      <NotFound />
    </template>
    <template v-if="isBlogPost" #doc-before>
      <ArticleTitle />
    </template>
    <template v-if="isBlogPost" #doc-after>
      <ArticleFooter />
    </template>
  </DefaultTheme.Layout>
</template>
