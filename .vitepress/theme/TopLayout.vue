<script setup lang="ts">
import { onMounted, ref } from 'vue'
import FitHeightText from './components/internal/FitHeightText.vue'

const willMount = ref(false)
onMounted(() => {
  willMount.value = true
})
</script>

<template>
  <div class="wrapper">
    <template v-if="willMount">
      <div class="green">
        <transition name="slide-from-right" appear>
          <FitHeightText class="greenInner">green</FitHeightText>
        </transition>
      </div>
      <div class="sapphire">
        <transition name="slide-from-right" appear>
          <FitHeightText class="sapphireInner">sapphire</FitHeightText>
        </transition>
      </div>
      <div class="red">
        <transition name="slide-from-right" appear>
          <FitHeightText class="redInner">red</FitHeightText>
        </transition>
      </div>
    </template>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-flow: column nowrap;
  overflow: hidden;
  flex: 1;
}

.green,
.sapphire,
.red {
  font-family: var(--s-curly-font);
  height: calc(100% / 3);
  padding: 0 1rem;
  color: #ffffff;
  font-size: 100%;
}
.green {
  text-align: left;
  background-color: var(--s-secondary-theme-green);
}
.sapphire {
  text-align: center;
  background-color: var(--s-secondary-theme-blue);
}
.red {
  text-align: right;
  background-color: var(--s-secondary-theme-red);
}

.greenInner,
.sapphireInner,
.redInner {
  max-width: calc(var(--vp-layout-max-width) - 64px);
  margin: 0 auto;
}

.sapphireInner {
  transition-delay: 0.2s;
}
.redInner {
  transition-delay: 0.4s;
}
</style>
