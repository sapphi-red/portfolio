<template>
  <page-title>Experiences</page-title>
  <section-title>Contests</section-title>
  <ul>
    <li>
      <a href="https://icttoracon.net/archives/8369">
        ICTトラブルシューティングコンテスト2019 チームstohm 本選9位
      </a>
    </li>
    <li>
      <a href="https://nttcom.connpass.com/event/163460/">
        学生向けN-ISUCON 1位
      </a>
    </li>
    <li>
      <a href="https://trap.jp/post/1114/">ISUCON10 本選3位</a>
    </li>
  </ul>
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
