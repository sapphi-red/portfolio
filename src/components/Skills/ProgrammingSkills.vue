<template>
  <bar-list :data="langs" />
</template>

<script lang="ts" setup>
import type { BarListData } from '/@/components/UI/BarList.vue'
import BarList from '/@/components/UI/BarList.vue'

const langs: BarListData = [
  {
    name: 'JavaScript/TypeScript',
    percentage: 100,
    children: [
      { name: 'Vue.js', percentage: 85 },
      { name: 'React', percentage: 60 },
      { name: 'Tensorflow.js', percentage: 20 }
    ]
  },
  { name: 'Go', percentage: 60 },
  { name: 'Rust', percentage: 20 },
  { name: 'CoffeeScript', percentage: 85 },
  { name: 'Java', percentage: 20 },
  { name: 'C/C++', percentage: 25 },
  { name: 'Python', percentage: 20 }
] as const
</script>
