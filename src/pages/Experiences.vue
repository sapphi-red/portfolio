<template>
  <page-title>Experiences</page-title>
  <section-title>Contests</section-title>
  <list :data="contests" />
  <section-title>Internships</section-title>
  <list :data="internships" />
  <section-title>Books</section-title>
  <list :data="books" />
  <section-title>OSS Contributions</section-title>
  <contributions />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageTitle from '/@/components/PageTitle.vue'
import SectionTitle from '/@/components/SectionTitle.vue'
import List from '/@/components/List.vue'
import Contributions from '/@/components/Contributions.vue'
import { contests } from '/@/assets/contests'
import { internships } from '/@/assets/internships'
import { books } from '/@/assets/books'

export default defineComponent({
  name: 'Experiences',
  components: {
    PageTitle,
    SectionTitle,
    List,
    Contributions
  },
  setup() {
    return { contests, internships, books }
  }
})
</script>
