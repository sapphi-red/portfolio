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
import FitHeightText from '/@/components/UI/FitHeightText.vue'

export default defineComponent({
  name: 'Index',
  components: {
    FitHeightText
  }
})
</script>

<style lang="scss" module>
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-flow: column nowrap;
}

.green,
.sapphire,
.red {
  @include curly-font;
  height: calc(100% / 3);
  padding: 0 1rem;
  color: #ffffff;
  font-size: 100%;
}
.green {
  text-align: left;
  background-color: $primary-theme-green;
}
.sapphire {
  text-align: center;
  background-color: $primary-theme-blue;
}
.red {
  text-align: right;
  background-color: $primary-theme-red;
}
</style>
