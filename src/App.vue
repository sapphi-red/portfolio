<template>
  <page-header />
  <transition name="header-hr">
    <header-h-r v-show="!isIndex" />
  </transition>
  <main :class="$style.main">
    <div :class="$style.mainContainer">
      <router-view v-slot="{ Component, route }">
        <transition
          :name="route.meta.transition || 'fade'"
          :mode="route.meta.transitionMode || 'out-in'"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import PageHeader from '/@/components/PageHeader.vue'
import HeaderHR from '/@/components/UI/HeaderHR.vue'

export default defineComponent({
  name: 'App',
  components: {
    PageHeader,
    HeaderHR
  },
  setup() {
    const route = useRoute()
    const isIndex = computed(
      // 初回表示はfrom.nameがundefined
      () => route.name === 'index'
    )
    return { isIndex }
  }
})
</script>

<style lang="scss">
@import './styles/global';

#app {
  display: flex;
  flex-flow: column;
  height: 100%;
}
</style>

<style lang="scss" module>
.main {
  position: relative;
  flex: 1 1;
  overflow: hidden auto;
  padding: 1rem;
}
.mainContainer {
  max-width: 1080px;
  margin: 0 auto;
}
</style>
