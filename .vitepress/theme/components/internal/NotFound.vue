<script setup lang="ts">
import { withBase, useData } from 'vitepress'
import magatamaGreenSvgUrl from '../../assets/magatama-green.svg'

const { theme } = useData()
</script>

<template>
  <div class="container">
    <p class="code">{{ theme.notFound?.code ?? '404' }}</p>
    <h1 class="title style">{{ theme.notFound?.title ?? 'PAGE NOT FOUND' }}</h1>
    <div class="divider"></div>
    <img :src="magatamaGreenSvgUrl" class="img" decoding="async" />

    <div class="action">
      <a
        class="link"
        :href="withBase('/')"
        :aria-label="theme.notFound?.linkLabel ?? 'go to home'"
      >
        {{ theme.notFound?.linkText ?? 'Take me home' }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 64px 24px 96px;
  text-align: center;
}

@media (min-width: 768px) {
  .NotFound {
    padding: 96px 32px 168px;
  }
}

.code {
  line-height: 64px;
  font-size: 64px;
  font-weight: 600;
  font-family: var(--s-curly-font);
}

.title {
  padding-top: 12px;
  letter-spacing: 2px;
  line-height: 20px;
  font-size: 20px;
  font-weight: 700;
}

.divider {
  margin: 24px auto 18px;
  width: 64px;
  height: 1px;
  background-color: var(--vp-c-divider);
}

.img {
  margin: 48px auto;
  animation: rotate 1.5s linear infinite;
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

.action {
  padding-top: 20px;
}

.link {
  display: inline-block;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 16px;
  padding: 3px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  transition:
    border-color 0.25s,
    color 0.25s;
}

.link:hover {
  border-color: var(--vp-c-brand-2);
  color: var(--vp-c-brand-2);
}
</style>
