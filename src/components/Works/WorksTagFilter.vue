<template>
  <ul>
    <li
      v-for="tag in tags"
      :key="tag"
      :class="$style.tag"
      role="checkbox"
      :aria-checked="selected.size === 0 || selected.has(tag)"
      @click="$emit('toggle', tag)"
    >
      {{ tag }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { Tag, tags } from '/@/assets/works'

defineProps<{
  selected: Set<Tag>
}>()

defineEmits<{
  (name: 'toggle', tag: Tag): void
}>()
</script>

<style lang="scss" module>
.tag {
  display: inline-block;
  cursor: pointer;
  &[aria-checked='false'] {
    opacity: 0.5;
  }
}
.tag {
  margin-right: 0.3em;
  &:last-child {
    margin-right: 0;
  }
}
</style>
