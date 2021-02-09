<template>
  <div ref="element" :class="$style.container">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, shallowRef } from 'vue'
import { throttle } from 'throttle-debounce'

const useWindowResize = (delay: number, handler: (e: UIEvent) => void) => {
  const throttledHandler = throttle(delay, handler)
  onMounted(() => {
    window.addEventListener('resize', throttledHandler, { passive: true })
  })
  onUnmounted(() => {
    window.removeEventListener('resize', throttledHandler)
  })
}

export default defineComponent({
  name: 'FitHeightText',
  setup() {
    const element = shallowRef<HTMLDivElement>()
    const setSize = () => {
      if (!element.value) return

      element.value.style.fontSize = `${element.value.clientHeight * 0.5}px`
      element.value.style.lineHeight = `${element.value.clientHeight}px`
    }

    onMounted(setSize)
    useWindowResize(100, setSize)
    return { element }
  }
})
</script>

<style lang="scss" module>
.container {
  height: 100%;
}
</style>
