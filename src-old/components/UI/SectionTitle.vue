<template>
  <h2 :class="$style.sectionTitle"><slot /></h2>
</template>

<style lang="scss" module>
.sectionTitle {
  @include curly-font;
  font-size: 2rem;
  margin-top: 0.5rem;
  &:first-child {
    margin-top: 0;
  }
}
</style>
