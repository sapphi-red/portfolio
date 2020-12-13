<template>
  <bar-list :data="langs" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BarList, { Data } from '/@/components/UI/BarList.vue'

const langs: Data[] = [
  {
    name: 'JavaScript/TypeScript',
    children: [{ name: 'Vue.js' }, { name: 'React' }, { name: 'Tensorflow.js' }]
  },
  { name: 'Go' },
  { name: 'Rust' },
  { name: 'CoffeeScript' },
  { name: 'Java' },
  { name: 'C/C++' },
  { name: 'Python' }
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
