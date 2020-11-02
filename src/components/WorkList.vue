<template>
  <ul :class="$style.container">
    <li v-for="work in works" :key="work.name">
      {{ work.name }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Work } from '/@/assets/works'

export default defineComponent({
  name: 'WorkList',
  props: {
    works: {
      type: Array as PropType<Work[]>,
      required: true
    }
  }
})
</script>
