import { computed, ComputedRef } from 'vue'
import { Work } from '/@/assets/works'

const useWorksImageOrFallback = (work: Work): ComputedRef<string> => {
  return computed(() => (work.img ? `/works-img/${work.img}` : '/noimg.svg'))
}

export default useWorksImageOrFallback
