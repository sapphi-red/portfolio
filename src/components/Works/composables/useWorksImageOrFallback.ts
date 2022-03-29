import { computed, ComputedRef, Ref } from 'vue'
import { Work } from '/@/assets/works'

const useWorksImageOrFallback = (work: Ref<Work>): ComputedRef<string> => {
  return computed(() =>
    work.value.img ? `/works-img/${work.value.img}` : '/noimg.svg'
  )
}

export default useWorksImageOrFallback
