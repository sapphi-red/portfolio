import type { Ref } from 'vue'
import { computed, unref } from 'vue'
import { useHead as useVueUseHead } from '@vueuse/head'

type MaybeRef<T> = T | Ref<T>

type Arg = {
  title: MaybeRef<string | null>
}

export const useHead = ({ title }: Arg) => {
  useVueUseHead({
    title: computed(() => {
      const prefix = unref(title)
      if (prefix === null) {
        return 'green.sapphi.red'
      }
      return `${prefix} - green.sapphi.red`
    })
  })
}
