<template>
  <div :class="$style.wrapper">
    <div :class="$style.green">
      <fit-height-text>green</fit-height-text>
    </div>
    <div :class="$style.sapphire">
      <fit-height-text>sapphire</fit-height-text>
    </div>
    <div :class="$style.red">
      <fit-height-text>red</fit-height-text>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FitHeightText from '/@/components/FitHeightText.vue'

export default defineComponent({
  name: 'Index',
  components: {
    FitHeightText
  }
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
