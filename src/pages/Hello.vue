<template>
  <routes />
  <div>Hello</div>
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
</template>

<script lang="ts">
import Routes from '/@/components/Routes.vue'
import HelloWorld from '/@/components/HelloWorld.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Hello',
  components: {
    Routes,
    HelloWorld
  }
})
</script>
