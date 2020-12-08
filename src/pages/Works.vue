<template>
  <page-title>Works</page-title>
  <work-list :works="works" :opened-modal-work-slug="workSlug" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import PageTitle from '/@/components/PageTitle.vue'
import WorkList from '/@/components/WorkList.vue'
import { works } from '/@/assets/works'
import { useRoute } from 'vue-router'

const getFirstIfArray = (a: string | string[]) => (Array.isArray(a) ? a[0] : a)

export default defineComponent({
  name: 'Works',
  components: {
    PageTitle,
    WorkList
  },
  setup() {
    const route = useRoute()
    const workSlug = computed(() => getFirstIfArray(route.params.workSlug))
    return { works, workSlug }
  }
})
</script>
