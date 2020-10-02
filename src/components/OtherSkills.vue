<template>
  <bar-list :data="skills" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BarList, { Data } from './BarList.vue'

const skills: Data[] = [
  { name: 'Docker', children: [] },
  { name: 'Ansible', children: [] },
  { name: '英語 (TOEIC 910)', children: [] }
]

export default defineComponent({
  name: 'OtherSkills',
  components: {
    BarList
  },
  setup() {
    return { skills }
  }
})
</script>

<style lang="scss" module>
.container {
}
</style>
