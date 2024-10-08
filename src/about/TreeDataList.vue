<script lang="ts" setup>
import type { TreeData } from '../assets/treeData'

defineProps<{
  data: TreeData
}>()
</script>

<template>
  <ul>
    <li v-for="datum in data" :key="datum.name">
      <a v-if="datum.href !== undefined" :href="datum.href">{{ datum.name }}</a>
      <template v-else>{{ datum.name }}</template>
      <TreeDataList
        v-if="datum.children && datum.children.length > 0"
        :data="datum.children"
      />
    </li>
  </ul>
</template>
