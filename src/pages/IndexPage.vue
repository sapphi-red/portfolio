<template>
  <div :class="$style.wrapper">
    <div :class="$style.green">
      <transition name="slide-from-right" appear>
        <fit-height-text>green</fit-height-text>
      </transition>
    </div>
    <div :class="$style.sapphire">
      <transition name="slide-from-right" appear>
        <fit-height-text :class="$style.sapphireInner"
          >sapphire</fit-height-text
        >
      </transition>
    </div>
    <div :class="$style.red">
      <transition name="slide-from-right" appear>
        <fit-height-text :class="$style.redInner">red</fit-height-text>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FitHeightText from '/@/components/UI/FitHeightText.vue'
import { useHead } from '/@/util/head'

export default defineComponent({
  name: 'IndexPage',
  components: {
    FitHeightText
  },
  setup() {
    useHead({ title: null })
    return {}
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

.sapphireInner {
  transition-delay: 0.2s;
}
.redInner {
  transition-delay: 0.4s;
}
</style>
