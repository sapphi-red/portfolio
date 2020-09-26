<template>
  <page-title>About</page-title>
  <section-title>Profile</section-title>
  <section-title>Interest</section-title>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageTitle from '/@/components/PageTitle.vue'
import SectionTitle from '/@/components/SectionTitle.vue'

export default defineComponent({
  name: 'Hello',
  components: {
    PageTitle,
    SectionTitle
  }
})
</script>
