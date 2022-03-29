<template>
  <ul>
    <li v-for="tag in tags" :key="tag" :class="$style.tag">{{ tag }}</li>
  </ul>
</template>

<script lang="ts" setup>
import { Tag } from '/@/assets/works'

defineProps<{
  tags: ReadonlyArray<Tag>
}>()
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
