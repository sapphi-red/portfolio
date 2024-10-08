<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import { data as posts } from './components/posts.data.js'

const { frontmatter: data } = useData()

const route = useRoute()

function findCurrentIndex() {
  return posts.findIndex(p => p.url === route.path)
}

const date = computed(() => posts[findCurrentIndex()].date)
const nextPost = computed(() => posts[findCurrentIndex() - 1])
const prevPost = computed(() => posts[findCurrentIndex() + 1])
</script>

<template>
  <article>
    <header>
      <time :datetime="date.datetimeString">{{ date.string }}</time>
      <h1>
        {{ data.title }}
      </h1>
    </header>

    <Content class="content" />

    <footer>
      <div v-if="nextPost">
        <h2>Next Article</h2>
        <div class="link">
          <a :href="nextPost.url">{{ nextPost.title }}</a>
        </div>
      </div>
      <div v-if="prevPost">
        <h2>Previous Article</h2>
        <div class="link">
          <a :href="prevPost.url">{{ prevPost.title }}</a>
        </div>
      </div>
    </footer>
  </article>
</template>

<style scoped>
.content {
  margin: 2rem;
}
</style>
