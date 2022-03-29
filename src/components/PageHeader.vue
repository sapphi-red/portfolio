<template>
  <header :class="$style.header">
    <router-link to="/" :class="$style.siteTitle">
      green.sapphi.red
    </router-link>
    <route-links :class="$style.routes" />
  </header>
</template>

<script lang="ts" setup>
import RouteLinks from '/@/components/RouteLinks.vue'
</script>

<style lang="scss" module>
.header {
  display: flex;
  align-items: center;
}
.siteTitle {
  @include curly-font;
  margin: 0.5rem;
  color: $default-font-theme;
  text-decoration: none;
  font-size: 1.2rem;
  @media (max-width: 600px) {
    display: none;
  }
}
.routes {
  margin-left: auto;
}
</style>
