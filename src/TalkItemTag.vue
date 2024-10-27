<script setup lang="ts">
defineProps<{
  tag: string
}>()
</script>

<template>
  <span class="tag">{{ tag }}</span>
</template>

<style scoped>
.tag {
  display: inline-block;
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 0 8px;
  line-height: 22px;
  font-size: 12px;
  font-weight: 500;
  transform: translateY(-2px);

  border-color: var(--vp-badge-info-border);
  color: var(--vp-badge-info-text);
  background-color: var(--vp-badge-info-bg);
}
</style>
