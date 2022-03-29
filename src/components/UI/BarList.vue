<template>
  <ul>
    <li v-for="datum in data" :key="datum.name">
      <bar-list-bar :percentage="datum.percentage" :count="count" />
      {{ datum.name }}
      <bar-list
        v-if="datum.children && datum.children.length > 0"
        :data="datum.children"
        :count="count + 1"
      />
    </li>
  </ul>
</template>

<script lang="ts">
export type BarListData = readonly BarListDataNode[]

interface BarListDataNode {
  name: string
  percentage: number
  children?: BarListData
}
</script>

<script lang="ts" setup>
import BarListBar from '/@/components/UI/BarListBar.vue'

withDefaults(
  defineProps<{
    data: BarListData
    count?: number
  }>(),
  {
    count: 0
  }
)
</script>
