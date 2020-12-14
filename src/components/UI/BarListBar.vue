<template>
  <div :class="$style.container" :data-color="color">
    <div :class="$style.inner" :style="{ width: `${percentage}%` }" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'BarListBar',
  props: {
    percentage: {
      type: Number,
      required: true
    },
    count: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const color = computed(() => {
      switch (props.count % 3) {
        case 0:
          return 'green'
        case 1:
          return 'blue'
        case 2:
          return 'red'
      }
      return 'green'
    })
    return { color }
  }
})
</script>

<style lang="scss" module>
.container {
  display: inline-block;
  height: 1em;
  width: 10em;
  background-image: linear-gradient(
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.7)
  );
  background-blend-mode: luminosity;

  &[data-color='green'] {
    color: $primary-theme-green;
    background-color: $primary-theme-green;
  }
  &[data-color='blue'] {
    color: $primary-theme-blue;
    background-color: $primary-theme-blue;
  }
  &[data-color='red'] {
    color: $primary-theme-red;
    background-color: $primary-theme-red;
  }
}
.inner {
  height: 100%;
  background-color: currentColor;
}
</style>
