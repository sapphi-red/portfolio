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

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Tag, tags } from '/@/assets/works'

export default defineComponent({
  name: 'WorksTagFilter',
  props: {
    selected: {
      type: Set as PropType<Set<Tag>>,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toggle: (_tag: Tag) => true
  },
  setup() {
    return { tags }
  }
})
</script>

<style lang="scss" module>
.tag {
  display: inline-block;
  cursor: pointer;
  &[aria-checked='false'] {
    opacity: 0.5;
  }
}
.tag + .tag {
  margin-left: 0.3em;
}
</style>
