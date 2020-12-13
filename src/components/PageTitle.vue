<template>
  <h1 :class="$style.pageTitle"><slot /></h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageTitle'
})
</script>

<style lang="scss" module>
.pageTitle {
  @include curly-font;
  font-size: 3rem;
  margin-top: 1rem;
  &:first-child {
    margin-top: 0;
  }
}
</style>
