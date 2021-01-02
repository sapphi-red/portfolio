<template>
  <ul>
    <li v-for="tag in tags" :key="tag" :class="$style.tag">{{ tag }}</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Tag } from '/@/assets/works'

export default defineComponent({
  name: 'WorkTagList',
  props: {
    tags: {
      type: Array as PropType<ReadonlyArray<Tag>>,
      required: true
    }
  }
})
</script>

<style lang="scss" module>
.tag {
  display: inline-block;
}
.tag {
  margin-right: 0.3em;
  &:last-child {
    margin-right: 0;
  }
}
</style>
