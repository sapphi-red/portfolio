<template>
  <transition name="background-shadow">
    <div v-if="show" :class="$style.modalBackground" />
  </transition>
  <transition name="zoom">
    <div v-if="show" :class="$style.modalContainer">
      <div :class="$style.modal">
        <h2>{{ work.name }}</h2>
        <work-tag-list :tags="work.tags" />
        <img :src="img" :class="$style.img" loading="lazy" />
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="work.desc" />
        <work-articles :articles="work.articles" />
        <router-link to="/works" :class="$style.close">
          <button :class="$style.closeButton">閉じる</button>
        </router-link>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Work } from '/@/assets/works'
import WorkTagList from '/@/components/Works/WorkTagList.vue'
import WorkArticles from '/@/components/Works/WorkArticles.vue'
import useWorksImageOrFallback from '/@/components/Works/use/img'

export default defineComponent({
  name: 'WorkModal',
  components: {
    WorkTagList,
    WorkArticles
  },
  props: {
    work: {
      type: Object as PropType<Work>,
      required: true
    },
    show: {
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
.modalContainer {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  height: 100%;
  width: 100%;
  padding: 3rem;
  overflow: {
    x: hidden;
    y: auto;
  }

  @media (max-width: 600px) {
    padding: 1rem;
  }

  // アニメーション時にスクロールバーを透明化
  &:global(.zoom-enter-active),
  &:global(.zoom-leave-active) {
    scrollbar-color: transparent transparent;
    &::-webkit-scrollbar {
      visibility: hidden;
    }
  }
}
.modalBackground {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal {
  display: flex;
  flex-direction: column;
  min-width: 50vw;
  min-height: 50vh;
  max-width: 1080px;
  margin: auto;
  padding: 1rem;
  background-color: #fff;
  border: solid 0.02rem $default-font-theme;
  border-radius: 0.3rem;
  z-index: 1;
}
.img {
  max-height: 450px;
  width: 100%;
  margin: 1rem auto;
  object-fit: contain;
}
.close {
  width: 5rem;
  margin-top: 1rem;
  color: white;
  background-color: $default-font-theme;
  border-radius: 0.15rem;
}
.closeButton {
  display: inline-block;
  width: 100%;
}
</style>
