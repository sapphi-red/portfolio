<template>
  <page-header />
  <transition name="header-hr">
    <header-h-r v-show="!isIndex" />
  </transition>
  <main ref="mainRef" :class="$style.main">
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

<script lang="ts" setup>
import { computed, shallowRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import PageHeader from '/@/components/PageHeader.vue'
import HeaderHR from '/@/components/UI/HeaderHR.vue'

const routerRoute = useRoute()
const isIndex = computed(
  // 初回表示はfrom.nameがundefined
  () => routerRoute.name === 'index'
)

const mainRef = shallowRef<HTMLElement | null>(null)
watch(
  () => [routerRoute.name, routerRoute.meta.noScrollReset],
  async ([, noScrollResetAfter], [, noScrollResetBefore]) => {
    if (!mainRef.value) return
    if (noScrollResetBefore || noScrollResetAfter) return

    mainRef.value.scrollTop = 0
  }
)
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
