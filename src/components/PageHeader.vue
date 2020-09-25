<template>
  <header>
    <routes />
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Routes from '/@/components/Routes.vue'

export default defineComponent({
  name: 'PageHeader',
  components: {
    Routes
  }
})
</script>
