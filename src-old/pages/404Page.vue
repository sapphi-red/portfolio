<template>
  <div :class="$style.container">
    <page-title>404</page-title>
    <img :src="magatamaGreenSvgUrl" :class="$style.img" decoding="async" />
    <div :class="$style.link">
      <router-link to="/">Go to Top</router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PageTitle from '/@/components/UI/PageTitle.vue'
import { useHead } from '/@/util/head'
import magatamaGreenSvgUrl from '/@/assets/img/magatama-green.svg'

useHead({
  title: '404'
})
</script>

<style lang="scss" module>
.container {
  text-align: center;
}
.img {
  animation: rotate 1.5s linear infinite;
}
.link {
  margin-top: 10%;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(360deg);
  }
  60% {
    transform: rotate(360deg);
  }
  75% {
    transform: rotate(360deg) translateY(-10%);
  }
  90% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
