<template>
  <page-title>Experiences</page-title>
  <section-title>Contests</section-title>
  <section-title>Internships</section-title>
  <section-title>Books</section-title>
  <section-title>OSS Contributions</section-title>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageTitle from '/@/components/PageTitle.vue'
import SectionTitle from '/@/components/SectionTitle.vue'

export default defineComponent({
  name: 'Experiences',
  components: {
    PageTitle,
    SectionTitle
  }
})
</script>
