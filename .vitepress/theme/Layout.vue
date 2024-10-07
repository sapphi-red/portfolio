<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

const { frontmatter } = useData()
const DefaultLayout = DefaultTheme.Layout
</script>

<template>
  <Content v-if="frontmatter.layout === 'empty'" />
  <DefaultLayout v-else />
</template>
