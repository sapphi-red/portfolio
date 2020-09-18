<template>
  <routes />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Routes from '/@/components/Routes.vue'

export default defineComponent({
  name: 'App',
  components: {
    Routes
  }
})
</script>
