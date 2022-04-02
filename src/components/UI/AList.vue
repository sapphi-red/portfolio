<template>
  <ul>
    <li v-for="datum in data" :key="datum.name">
      <a v-if="datum.href !== undefined" :href="datum.href">{{ datum.name }}</a>
      <template v-else>{{ datum.name }}</template>
      <a-list
        v-if="datum.children && datum.children.length > 0"
        :data="datum.children"
      />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { TreeData } from '/@/data'

defineProps<{
  data: TreeData
}>()
</script>
