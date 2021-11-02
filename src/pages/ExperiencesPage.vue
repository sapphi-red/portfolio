<template>
  <div>
    <page-title>Experiences</page-title>
    <section-title>Contests</section-title>
    <a-list :data="contests" />
    <section-title>Internships</section-title>
    <a-list :data="internships" />
    <section-title>Books</section-title>
    <a-list :data="books" />
    <section-title>OSS Contributions</section-title>
    <p>マージされたPRの一覧</p>
    <my-contributions />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageTitle from '/@/components/UI/PageTitle.vue'
import SectionTitle from '/@/components/UI/SectionTitle.vue'
import AList from '/@/components/UI/AList.vue'
import MyContributions from '/@/components/Experiences/MyContributions.vue'
import { contests } from '/@/assets/contests'
import { internships } from '/@/assets/internships'
import { books } from '/@/assets/books'

export default defineComponent({
  name: 'ExperiencesPage',
  components: {
    PageTitle,
    SectionTitle,
    AList,
    MyContributions
  },
  setup() {
    return { contests, internships, books }
  }
})
</script>
