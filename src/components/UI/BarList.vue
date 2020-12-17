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
import { defineComponent, PropType } from 'vue'
import BarListBar from '/@/components/UI/BarListBar.vue'

export type BarListData = readonly BarListDataNode[]

interface BarListDataNode {
  name: string
  percentage: number
  children?: BarListData
}

export default defineComponent({
  name: 'BarList',
  components: {
    BarListBar
  },
  props: {
    data: {
      type: Array as PropType<BarListData>,
      required: true
    },
    count: {
      type: Number,
      default: 0
    }
  }
})
</script>

<style lang="scss" module>
.container {
}
</style>
