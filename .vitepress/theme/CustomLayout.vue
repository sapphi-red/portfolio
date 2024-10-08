<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import NotFound from './components/internal/NotFound.vue'
</script>

<template>
  <DefaultTheme.Layout>
    <template #not-found>
      <NotFound />
    </template>
  </DefaultTheme.Layout>
</template>
