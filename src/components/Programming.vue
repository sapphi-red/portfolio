<template>
  <bar-list :data="langs" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BarList, { Data } from './BarList.vue'

const langs: Data[] = [
  {
    name: 'JavaScript/TypeScript',
    children: [
      { name: 'Vue.js', children: [] },
      { name: 'React', children: [] },
      { name: 'Tensorflow.js', children: [] }
    ]
  },
  { name: 'Go', children: [] },
  { name: 'Rust', children: [] },
  { name: 'CoffeeScript', children: [] },
  { name: 'Java', children: [] },
  { name: 'C/C++', children: [] },
  { name: 'Python', children: [] }
]

export default defineComponent({
  name: 'Programming',
  components: {
    BarList
  },
  setup() {
    return { langs }
  }
})
</script>

<style lang="scss" module>
.container {
}
</style>
