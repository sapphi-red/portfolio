<template>
  <router-link :to="`/works/${work.slug}`" :class="$style.container">
    <img
      :class="$style.img"
      :src="
        work.img ? `/@/assets/works-img/${work.img}` : '/@/assets/noimg.svg'
      "
    />
    <p :class="$style.name">{{ work.name }}</p>
    <teleport v-if="isModalOpen" to="#modal">
      <work-modal :work="work" />
    </teleport>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Work } from '/@/assets/works'
import WorkModal from '/@/components/Works/WorkModal.vue'

export default defineComponent({
  name: 'Work',
  components: {
    WorkModal
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
}
.img {
  width: 100%;
}
.name {
  font-weight: bold;
}
</style>
