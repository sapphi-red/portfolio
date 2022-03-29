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

<script lang="ts" setup>
import { computed, ref } from 'vue'
import PageTitle from '/@/components/UI/PageTitle.vue'
import WorkList from '/@/components/Works/WorkList.vue'
import { Tag, works } from '/@/assets/works'
import WorksTagFilter from '/@/components/Works/WorksTagFilter.vue'
import { useHead } from '/@/util/head'

const props = defineProps<{
  workSlug?: string
}>()

const hasAny = <T>(target: ReadonlyArray<T>, anyOf: ReadonlySet<T>) => {
  for (const t of target) {
    if (anyOf.has(t)) {
      return true
    }
  }
  return false
}

const showingWork = computed(() =>
  works.find(work => work.slug === props.workSlug)
)
useHead({
  title: computed(() => (showingWork.value ? showingWork.value.name : 'Work'))
})

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
</script>

<style lang="scss" module>
.tagFilter {
  margin: 0.5rem 0;
}
</style>
