<template>
  <div :class="$style.container">
    <router-link
      v-for="r in routeData"
      :key="r.name"
      :class="$style.link"
      :to="{ name: r.name }"
    >
      {{ r.title }}
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { routes } from '/@/router'

export default defineComponent({
  name: 'Routes',
  setup() {
    const routeData = routes
      .filter(route => route.meta?.showInRoutes)
      .map(route => ({
        name: route.name,
        title: route.name
      }))

    return { routeData }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  align-items: center;
  padding: 0.25em 0.5em;
}
.link {
  @include curly-font;
  position: relative;
  color: $default-font-theme;
  text-decoration: none;
  margin: 0 1em;
  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 0.1em;
    background-color: $default-font-theme;
    border-radius: 0.05em;
    z-index: -1;
    transition: transform 0.3s ease;

    transform: scaleX(0);
    transform-origin: bottom right;
  }
  &:hover::before {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
}
</style>
