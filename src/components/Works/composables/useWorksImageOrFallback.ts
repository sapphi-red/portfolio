import type { ComputedRef, Ref } from 'vue'
import { computed } from 'vue'
import type { Work } from '/@/assets/works'
import noimgSvgUrl from '/@/assets/img/noimg.svg'

const worksImgUrls = import.meta.globEager<{ default: string }>(
  '../../../assets/img/works/*.png'
)

const useWorksImageOrFallback = (work: Ref<Work>): ComputedRef<string> => {
  return computed(
    () =>
      worksImgUrls[`../../../assets/img/works/${work.value.img}`]?.default ??
      noimgSvgUrl
  )
}

export default useWorksImageOrFallback
