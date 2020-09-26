<template>
  <page-header />
  <header-h-r v-if="!isIndex" />
  <main :class="$style.main">
    <router-view />
  </main>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import PageHeader from '/@/components/PageHeader.vue'
import HeaderHR from '/@/components/HeaderHR.vue'

export default defineComponent({
  name: 'App',
  components: {
    PageHeader,
    HeaderHR
  },
  setup() {
    const route = useRoute()
    const isIndex = computed(() => route.name === 'index')
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
  flex: 1 1;
  overflow: hidden auto;
}
</style>
