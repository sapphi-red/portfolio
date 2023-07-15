import type { Ref } from 'vue'
import { computed, unref } from 'vue'
import { useHead as useUnhead } from '@unhead/vue'

type MaybeRef<T> = T | Ref<T>

type Arg = {
  title: MaybeRef<string | null>
}

export const useHead = ({ title }: Arg) => {
  useUnhead({
    title: computed(() => {
      const prefix = unref(title)
      if (prefix === null) {
        return 'green.sapphi.red'
      }
      return `${prefix} - green.sapphi.red`
    })
  })
}
