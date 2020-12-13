<template>
  <li>
    <router-link :to="`/works/${work.slug}`">{{ work.name }}</router-link>
    <teleport v-if="isModalOpen" to="#modal">
      <div :class="$style.modalContainer">
        <div :class="$style.modal">
          <h2>{{ work.name }}</h2>
          <ul>
            <li v-for="tag in work.tags" :key="tag">{{ tag }}</li>
          </ul>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="work.desc"></div>
          <router-link to="/works"><button>閉じる</button></router-link>
        </div>
      </div>
    </teleport>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Work } from '/@/assets/works'

export default defineComponent({
  name: 'Work',
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
.modalContainer {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: {
    x: hidden;
    y: auto;
  }
}
.modal {
  margin: 3rem;
  background-color: #fff;
  border: solid 0.02rem $default-font-theme;
}
</style>
