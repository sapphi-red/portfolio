<template>
  <router-link :to="`/works/${work.slug}`" :class="$style.container">
    <aspect-image :src="img" loading="lazy" />
    <div :class="$style.innerContainer">
      <p :class="$style.name">{{ work.name }}</p>
      <work-tag-list :tags="work.tags" />
    </div>
    <teleport to="#modal">
      <work-modal :show="isModalOpen" :work="work" />
    </teleport>
  </router-link>
</template>

<script lang="ts" setup>
import { Work } from '/@/assets/works'
import WorkModal from '/@/components/Works/WorkModal.vue'
import AspectImage from '/@/components/UI/AspectImage.vue'
import WorkTagList from '/@/components/Works/WorkTagList.vue'
import useWorksImageOrFallback from './composables/useWorksImageOrFallback'
import { toRef } from 'vue'

const props = withDefaults(
  defineProps<{
    work: Work
    isModalOpen?: boolean
  }>(),
  {
    isModalOpen: false
  }
)

const img = useWorksImageOrFallback(toRef(props, 'work'))
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
