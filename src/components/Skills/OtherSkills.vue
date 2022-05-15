<template>
  <bar-list :data="skills" />
</template>

<script lang="ts" setup>
import type { BarListData } from '/@/components/UI/BarList.vue'
import BarList from '/@/components/UI/BarList.vue'

const skills: BarListData = [
  { name: 'OpenAPI', percentage: 70 },
  { name: 'Docker', percentage: 65 },
  { name: 'Ansible', percentage: 45 },
  { name: 'Figma', percentage: 45 },
  { name: 'GitHub Actions', percentage: 45 },
  { name: '英語 (TOEIC L&R 925)', percentage: 70 }
]
</script>
