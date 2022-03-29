<template>
  <div :class="$style.imgContainer">
    <img v-bind="$attrs" :class="$style.img" />
  </div>
</template>

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
