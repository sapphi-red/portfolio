<template>
  <page-title>Works</page-title>
  <work-list :works="works" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageTitle from '/@/components/PageTitle.vue'
import WorkList from '/@/components/WorkList.vue'
import { works } from '/@/assets/works'

export default defineComponent({
  name: 'Works',
  components: {
    PageTitle,
    WorkList
  },
  setup() {
    return { works }
  }
})
</script>
