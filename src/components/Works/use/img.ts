import { computed, ComputedRef } from 'vue'
import { Work } from '/@/assets/works'

const useWorksImageOrFallback = (work: Work): ComputedRef<string> => {
  return computed(() =>
    work.img ? `/@/assets/works-img/${work.img}` : '/@/assets/noimg.svg'
  )
}

export default useWorksImageOrFallback
