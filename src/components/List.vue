<template>
  <ul>
    <li v-for="datum in data" :key="datum.name">
      <a v-if="datum.href !== undefined" :href="datum.href">{{ datum.name }}</a>
      <template v-else>{{ datum.name }}</template>
      <list
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
  href?: string
  children?: Data[]
}

export default defineComponent({
  name: 'List',
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
