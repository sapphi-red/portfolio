import type { ComputedRef, Ref } from 'vue'
import { computed } from 'vue'
import type { Work } from '/@/assets/works'

const useWorksImageOrFallback = (work: Ref<Work>): ComputedRef<string> => {
  return computed(() =>
    work.value.img ? `/works-img/${work.value.img}` : '/noimg.svg'
  )
}

export default useWorksImageOrFallback
