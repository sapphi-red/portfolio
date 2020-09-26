<template>
  <h2 :class="$style.sectionTitle"><slot /></h2>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SectionTitle'
})
</script>

<style lang="scss" module>
.sectionTitle {
  @include curly-font;
  font-size: 2rem;
}
</style>
