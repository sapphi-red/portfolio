<template>
  <div>
    <page-title>Works</page-title>
    <works-tag-filter
      :selected="selectedTags"
      :class="$style.tagFilter"
      @toggle="onToggleTag"
    />
    <work-list :works="filteredWorks" :opened-modal-work-slug="workSlug" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import PageTitle from '/@/components/UI/PageTitle.vue'
import WorkList from '/@/components/Works/WorkList.vue'
import { Tag, works } from '/@/assets/works'
import WorksTagFilter from '/@/components/Works/WorksTagFilter.vue'

const hasAny = <T>(target: ReadonlyArray<T>, anyOf: ReadonlySet<T>) => {
  for (const t of target) {
    if (anyOf.has(t)) {
      return true
    }
  }
  return false
}

export default defineComponent({
  name: 'WorksPage',
  components: {
    PageTitle,
    WorksTagFilter,
    WorkList
  },
  props: {
    workSlug: {
      type: String,
      default: undefined
    }
  },
  setup() {
    const selectedTags = ref(new Set<Tag>())
    const onToggleTag = (tag: Tag) => {
      if (selectedTags.value.has(tag)) {
        selectedTags.value.delete(tag)
      } else {
        selectedTags.value.add(tag)
      }
    }

    const filteredWorks = computed(() =>
      works.filter(
        work =>
          selectedTags.value.size === 0 || hasAny(work.tags, selectedTags.value)
      )
    )

    return { filteredWorks, selectedTags, onToggleTag }
  }
})
</script>

<style lang="scss" module>
.tagFilter {
  margin: 0.5rem 0;
}
</style>
