<template>
  <li>
    <div :class="$style.imgContainer">
      <img v-if="work.img" :src="`/@/assets/works-img/${work.img}`" />
    </div>
    <router-link :to="`/works/${work.slug}`">{{ work.name }}</router-link>
    <teleport v-if="isModalOpen" to="#modal">
      <work-modal :work="work" />
    </teleport>
  </li>
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
.imgContainer {
}
</style>
