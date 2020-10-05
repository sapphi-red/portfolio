<template>
  <page-title>Experiences</page-title>
  <section-title>Contests</section-title>
  <list :data="contests" />
  <section-title>Internships</section-title>
  <section-title>Books</section-title>
  <section-title>OSS Contributions</section-title>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageTitle from '/@/components/PageTitle.vue'
import SectionTitle from '/@/components/SectionTitle.vue'
import List, { Data } from '../components/List.vue'

const contests: Data[] = [
  {
    name: 'ICTトラブルシューティングコンテスト2019 チームstohm 本選9位',
    href: 'https://icttoracon.net/archives/8369'
  },
  {
    name: '学生向けN-ISUCON 1位',
    href: 'https://nttcom.connpass.com/event/163460/'
  },
  { name: 'ISUCON10 チーム「がんもどき」 本選3位' }
]
]

export default defineComponent({
  name: 'Experiences',
  components: {
    PageTitle,
    SectionTitle,
    List
  },
  setup() {
    return { contests }
  }
})
</script>
