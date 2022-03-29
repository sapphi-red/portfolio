<template>
  <div ref="element" :class="$style.container">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, shallowRef } from 'vue'
import useWindowResize from './composables/useWindowResize'

const element = shallowRef<HTMLDivElement>()
const setSize = () => {
  if (!element.value) return

  element.value.style.fontSize = `${element.value.clientHeight * 0.5}px`
  element.value.style.lineHeight = `${element.value.clientHeight}px`
}

onMounted(setSize)
useWindowResize(100, setSize)
</script>

<style lang="scss" module>
.container {
  height: 100%;
  font-size: 0;
}
</style>
