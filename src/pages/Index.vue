<template>
  <routes />
  <div>Index Page</div>
  <img alt="Vue logo" src="/@/assets/logo.png" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Routes from '/@/components/Routes.vue'
export default defineComponent({
  name: 'Index',
  components: {
    Routes
  }
})
</script>
