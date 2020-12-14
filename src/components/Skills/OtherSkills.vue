<template>
  <bar-list :data="skills" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BarList, { Data } from '/@/components/UI/BarList.vue'

const skills: Data[] = [
  { name: 'Docker', percentage: 65 },
  { name: 'Ansible', percentage: 45 },
  { name: '英語 (TOEIC 910)', percentage: 70 }
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
