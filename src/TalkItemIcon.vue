<script setup lang="ts">
import IconSlideShow from '~icons/tabler/slideshow'
import IconMovie from '~icons/tabler/movie'
import IconArticle from '~icons/tabler/article'

defineProps<{
  type: 'slides' | 'video' | 'article'
}>()
</script>

<template>
  <IconSlideShow v-if="type === 'slides'" />
  <IconMovie v-else-if="type === 'video'" />
  <IconArticle v-else-if="type === 'article'" />
</template>
