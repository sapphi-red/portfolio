<template>
  <div>
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

const getTitle = (name: string) => {
  return name[0].toUpperCase() + name.slice(1)
}

export default defineComponent({
  name: 'Routes',
  setup() {
    const routeData = routes.map(route => ({
      name: route.name,
      title: getTitle(route.name)
    }))

    return { routeData }
  }
})
</script>

<style lang="scss" module>
.link + .link {
  margin-left: 0.5ch;
  padding-left: 0.5ch;
  border-left: solid 0.1ch black;
}
</style>
