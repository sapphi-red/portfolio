<script setup lang="ts">
import { useData } from 'vitepress'
import { onBeforeMount, ref, useTemplateRef, watch } from 'vue'
const { isDark } = useData()

const props = defineProps<{
  id: string
  hideCards?: boolean
}>()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const twttr: any

const xWidgetLibId = 'x-widget-lib'
const isXWidgetLibLoaded = ref(typeof twttr !== 'undefined')
onBeforeMount(() => {
  if (document.querySelector(xWidgetLibId)) return

  const script = document.createElement('script')
  script.id = xWidgetLibId
  script.src = 'https://platform.twitter.com/widgets.js'
  script.async = true
  script.addEventListener(
    'load',
    () => {
      twttr.ready().then(() => {
        isXWidgetLibLoaded.value = true
      })
    },
    { once: true },
  )
  document.head.appendChild(script)
})

const loaded = ref(false)
const targetRef = useTemplateRef('targetRef')
watch(
  () => [
    props.id,
    props.hideCards,
    isDark.value,
    isXWidgetLibLoaded.value,
    targetRef.value,
  ],
  async () => {
    if (isXWidgetLibLoaded.value && targetRef.value) {
      const prevHeight = targetRef.value.getBoundingClientRect().height
      targetRef.value.innerHTML = ''
      if (prevHeight) {
        targetRef.value.style.height = `${prevHeight}px`
      }
      await twttr.widgets.createTweet(props.id, targetRef.value, {
        theme: isDark.value ? 'dark' : '',
        cards: props.hideCards ? 'hidden' : '',
      })
      targetRef.value.style.height = ''
      loaded.value = true
    }
  },
  { immediate: true },
)
</script>

<template>
  <blockquote v-if="!loaded"><slot></slot></blockquote>
  <blockquote ref="targetRef" class="x-post-embed"></blockquote>
</template>

<style scoped>
.x-post-embed {
  border: none;
  padding: 0;
}
</style>
