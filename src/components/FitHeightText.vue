<template>
  <div ref="element" :class="$style.container">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, shallowRef } from 'vue'

export default defineComponent({
  name: 'FitHeightText',
  setup() {
    const element = shallowRef<HTMLDivElement>()
    onMounted(() => {
      if (!element.value) return

      element.value.style.fontSize = `${element.value.clientHeight * 0.5}px`
      element.value.style.lineHeight = `${element.value.clientHeight}px`
    })
    return { element }
  }
})
</script>

<style lang="scss" module>
.container {
  height: 100%;
}
</style>
