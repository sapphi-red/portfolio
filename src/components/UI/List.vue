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
import { TreeData } from '/@/data'

export default defineComponent({
  name: 'List',
  props: {
    data: {
      type: Array as PropType<TreeData>,
      required: true
    }
  }
})
</script>

<style lang="scss" module>
.container {
}
</style>
