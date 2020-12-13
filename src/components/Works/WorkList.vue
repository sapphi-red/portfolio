<template>
  <ul>
    <work
      v-for="work in works"
      :key="work.slug"
      :work="work"
      :is-modal-open="work.slug === openedModalWorkSlug"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Work as WorkI } from '/@/assets/works'
import Work from '/@/components/Works/Work.vue'

export default defineComponent({
  name: 'WorkList',
  components: {
    Work
  },
  props: {
    works: {
      type: Array as PropType<WorkI[]>,
      required: true
    },
    openedModalWorkSlug: {
      type: String,
      default: undefined
    }
  }
})
</script>
