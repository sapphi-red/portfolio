<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import { data as posts } from './posts.data.js'

const { frontmatter: data } = useData()

const route = useRoute()

function findCurrentIndex() {
  return posts.findIndex(p => p.url === route.path)
}

const date = computed(() => posts[findCurrentIndex()].date)
</script>

<template>
  <header>
    <time :datetime="date.datetimeString">{{ date.string }}</time>
    <h1>
      {{ data.title }}
    </h1>
  </header>
</template>
