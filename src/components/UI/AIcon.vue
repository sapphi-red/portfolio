<template>
  <div :class="$style.container">
    <span class="iconify" :class="$style.icon" :data-icon="`uil:${name}`" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  name: string
}>()
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
