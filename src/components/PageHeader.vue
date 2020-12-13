<template>
  <header :class="$style.header">
    <router-link to="/" :class="$style.siteTitle">
      green.sapphi.red
    </router-link>
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

<style lang="scss" module>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.siteTitle {
  @include curly-font;
  margin: 0.5rem;
  color: $default-font-theme;
  text-decoration: none;
  font-size: 1.2rem;
}
</style>
