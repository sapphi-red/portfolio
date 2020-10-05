<template>
  <page-title>Experiences</page-title>
  <section-title>Contests</section-title>
  <list :data="contests" />
  <section-title>Internships</section-title>
  <list :data="internships" />
  <section-title>Books</section-title>
  <list :data="books" />
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

const internships: Data[] = [
  {
    name: '2019/08: モイ株式会社 ツイキャスサマーインターン2019',
    href: 'https://twitcasting.tv/internship2019.php',
    children: [
      { name: '機械学習を利用したライブ配信UIを3人チームで2週間で製作。' }
    ]
  },
  {
    name: '2020/08: 株式会社メルカリ Online Summer Internship for Gophers 2020',
    href: 'https://mercan.mercari.com/articles/22800/',
    children: [{ name: 'Go言語のLintツールを1週間で製作。' }]
  },
  { name: '2020/09～: 株式会社マネーフォワード' }
]

const books: Data[] = [
  {
    name: 'traP SysAd techbook',
    href: 'https://techbookfest.org/product/5666319127019520',
    children: [
      {
        name:
          '第6章「全自動生成ライブラリnode-traq」、第7章「Paint Workletを使ってみた」を執筆。'
      }
    ]
  },
  {
    name: 'traP SysAd techbook2',
    href: 'https://techbookfest.org/product/4883682603040768',
    children: [
      {
        name:
          '第6章「通知でのインライン返信を実装した」、第7章「何もしてないのにtraQが重くなった」などを執筆。'
      }
    ]
  }
]

export default defineComponent({
  name: 'Experiences',
  components: {
    PageTitle,
    SectionTitle,
    List
  },
  setup() {
    return { contests, internships, books }
  }
})
</script>
