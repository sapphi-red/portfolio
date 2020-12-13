<template>
  <ul>
    <li v-for="datum in data" :key="datum.name">
      {{ datum.name }}
      <bar-list
        v-if="datum.children && datum.children.length > 0"
        :data="datum.children"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export interface Data {
  name: string
  children?: Data[]
}

export default defineComponent({
  name: 'BarList',
  props: {
    data: {
      type: Array as PropType<Data[]>,
      required: true
    }
  }
})
</script>

<style lang="scss" module>
.container {
}
</style>
