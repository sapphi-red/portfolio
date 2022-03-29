import { throttle } from 'throttle-debounce'
import { onMounted, onUnmounted } from 'vue'

const useWindowResize = (delay: number, handler: (e: UIEvent) => void) => {
  const throttledHandler = throttle(delay, handler)
  onMounted(() => {
    window.addEventListener('resize', throttledHandler, { passive: true })
  })
  onUnmounted(() => {
    window.removeEventListener('resize', throttledHandler)
  })
}

export default useWindowResize
