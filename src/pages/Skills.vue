<template>
  <page-title>Skills</page-title>
  <section-title>Programming</section-title>
  <section-title>Other</section-title>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageTitle from '/@/components/PageTitle.vue'
import SectionTitle from '/@/components/SectionTitle.vue'

export default defineComponent({
  name: 'Skills',
  components: {
    PageTitle,
    SectionTitle
  }
})
</script>
