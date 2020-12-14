<template>
  <div :class="$style.container">
    <work
      v-for="work in works"
      :key="work.slug"
      :work="work"
      :is-modal-open="work.slug === openedModalWorkSlug"
      :class="$style.work"
    />
  </div>
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

<style lang="scss" module>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 2rem;
}
.work {
  min-height: 10rem;
}
</style>
