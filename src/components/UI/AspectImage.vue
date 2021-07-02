<template>
  <div :class="$style.imgContainer">
    <img v-bind="$attrs" :class="$style.img" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AspectImage'
})
</script>

<style lang="scss" module>
.imgContainer {
  position: relative;
  width: 100%;
  &::before {
    content: '';
    display: block;
    padding-top: math.div(9, 16) * 100%;
  }
}
.img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
