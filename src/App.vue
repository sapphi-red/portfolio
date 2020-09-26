<template>
  <page-header />
  <main>
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
</style>
