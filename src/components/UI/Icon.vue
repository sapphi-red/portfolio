<template>
  <div :class="$style.container">
    <span class="iconify" :class="$style.icon" :data-icon="`uil:${name}`" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true
    }
  }
})
</script>

<style lang="scss" module>
.container {
  display: inline-block;
  contain: strict;
  width: 1em;
  height: 1em;
}
.icon {
  width: 100%;
  height: 100%;
}
</style>
