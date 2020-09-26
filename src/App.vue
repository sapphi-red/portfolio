<template>
  <page-header />
  <main :class="$style.main">
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageHeader from '/@/components/PageHeader.vue'

export default defineComponent({
  name: 'App',
  components: {
    PageHeader
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
