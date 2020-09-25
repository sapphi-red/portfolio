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
  font-size: 3rem;
}
</style>
