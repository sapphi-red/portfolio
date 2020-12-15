<template>
  <router-link :to="`/works/${work.slug}`" :class="$style.container">
    <aspect-image :src="img" />
    <p :class="$style.name">{{ work.name }}</p>
    <work-tag-list :tags="work.tags" />
    <teleport to="#modal">
      <work-modal :show="isModalOpen" :work="work" />
    </teleport>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Work } from '/@/assets/works'
import WorkModal from '/@/components/Works/WorkModal.vue'
import AspectImage from '/@/components/UI/AspectImage.vue'
import WorkTagList from '/@/components/Works/WorkTagList.vue'
import useWorksImageOrFallback from '/@/components/Works/use/img'

export default defineComponent({
  name: 'Work',
  components: {
    WorkModal,
    AspectImage,
    WorkTagList
  },
  props: {
    work: {
      type: Object as PropType<Work>,
      required: true
    },
    isModalOpen: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const img = useWorksImageOrFallback(props.work)
    return { img }
  }
})
</script>

<style lang="scss" module>
.container {
  border: solid 2px $primary-theme-green;
  border-radius: 0.3rem;
  overflow: hidden;
  color: $default-font-theme;
  text-decoration: none;
  // TODO: hover
  // TODO: color change by count
}
.name {
  font-weight: bold;
}
</style>
