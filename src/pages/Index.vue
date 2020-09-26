<template>
  <div :class="$style.wrapper">
    <div :class="$style.green">green</div>
    <div :class="$style.sapphire">sapphire</div>
    <div :class="$style.red">red</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Index'
})
</script>

<style lang="scss" module>
.wrapper {
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
}

.green,
.sapphire,
.red {
  @include curly-font;
  height: calc(100% / 3);
  color: #ffffff;
  font-size: 100%;
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
