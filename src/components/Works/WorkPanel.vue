<template>
  <router-link :to="`/works/${work.slug}`" :class="$style.container">
    <aspect-image :src="img" />
    <div :class="$style.innerContainer">
      <p :class="$style.name">{{ work.name }}</p>
      <work-tag-list :tags="work.tags" />
    </div>
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
  name: 'WorkPanel',
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
  // TODO: color change by count

  &:hover {
    background-color: $primary-theme-green;
    background-image: linear-gradient(
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.9)
    );
    background-blend-mode: luminosity;
  }
}
.innerContainer {
  padding: 0.5rem;
}
.name {
  font-weight: bold;
}
</style>
