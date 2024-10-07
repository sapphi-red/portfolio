<template>
  <div :class="$style.container">
    <div :class="$style.green" />
    <div :class="$style.blue" />
    <div :class="$style.red" />
  </div>
</template>

<style lang="scss" module>
.container {
  width: 100%;
}

.green,
.blue,
.red {
  height: 4px;
}

.green {
  background-color: $primary-theme-green;
}
.blue {
  background-color: $primary-theme-blue;
}
.red {
  background-color: $primary-theme-red;
}
</style>
