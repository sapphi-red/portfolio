<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import { data as posts } from './posts.data.js'

const route = useRoute()

function findCurrentIndex() {
  return posts.findIndex((p) => p.url === route.path)
}

const nextPost = computed(() => posts[findCurrentIndex() - 1])
const prevPost = computed(() => posts[findCurrentIndex() + 1])
</script>

<template>
  <footer class="article-footer">
    <nav class="article-footer-nav">
      <div class="article-footer-nav-item">
        <template v-if="prevPost">
          <h2 class="style">Previous Article</h2>
          <div class="article-footer-link">
            <a :href="prevPost.url" class="style">{{ prevPost.title }}</a>
          </div>
        </template>
      </div>
      <div class="article-footer-nav-item">
        <template v-if="nextPost">
          <h2 class="style">Next Article</h2>
          <div class="article-footer-link">
            <a :href="nextPost.url" class="style">{{ nextPost.title }}</a>
          </div>
        </template>
      </div>
    </nav>
  </footer>
</template>

<style scoped>
.article-footer {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 24px;
  margin-top: 48px 0 16px;
}

.article-footer-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
}

.article-footer-nav-item {
  flex: 1 1 240px;
}

.article-footer-link {
  color: var(--vp-c-brand-1);
}
</style>
