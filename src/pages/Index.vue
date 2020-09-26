<template>
  <div :class="$style.green">green</div>
  <div :class="$style.sapphire">sapphire</div>
  <div :class="$style.red">red</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Index'
})
</script>

<style lang="scss" module>
.green,
.sapphire,
.red {
  @include curly-font;
  color: #ffffff;
}
.green {
  background-color: $primary-theme-green;
}
.sapphire {
  background-color: $primary-theme-blue;
}
.red {
  background-color: $primary-theme-red;
}
</style>
