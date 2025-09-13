<script setup lang="ts">
import { computed } from 'vue'
import PRDataRaw from '../assets/prs.json'
import { dateToDateTimeString } from '../../common/date'

type PRDataType = typeof PRDataRaw
type CorrectPRDataType = {
  [K in keyof PRDataType]: K extends 'groupedPrs'
    ? CorrectPRsType<PRDataType[K]>
    : PRDataType[K]
}
type CorrectPRsType<T extends unknown[][]> = [
  string,
  Exclude<T[number][number], string>,
][]

const PRData = PRDataRaw as CorrectPRDataType

const additional: Record<
  string,
  Record<number, { title: string; href: string }[]>
> = {
  'tensorflow/tfjs': {
    2543: [
      {
        title:
          'Related blog post (Japanese): TensorFlow.jsでwasmを使ってみるためにコントリビュートした',
        href: 'https://trap.jp/post/927/',
      },
    ],
  },
  'protobufjs/protobuf.js': {
    1446: [
      {
        title: 'Related blog post (Japanese): 裏ハッカソン参加記「Emoine」',
        href: 'https://trap.jp/post/1093/',
      },
    ],
  },
  'vueuse/vueuse': {
    468: [
      {
        title:
          'Related blog post (Japanese): CPCTF2021を実現させたスコアサーバー',
        href: 'https://trap.jp/post/1308/',
      },
    ],
  },
  'vitejs/vite': {
    19234: [
      {
        title:
          'Related blog post: Addressing Source Code Leaks Across the Ecosystem – A Retrospective',
        href: '/blog/addressing-source-code-leaks-across-the-ecosystem-a-retrospective',
      },
      {
        title: 'Related blog post: Local Server Security Best Practices',
        href: '/blog/local-server-security-best-practices',
      },
    ],
  },
}

const lastFetched = computed(() =>
  dateToDateTimeString(new Date(PRData.fetchedAt)),
)
</script>

<template>
  <template v-for="[year, repos] in PRData.groupedPrs" :key="year">
    <h2>{{ year }}</h2>
    <ul>
      <li v-for="[repoName, repo] in Object.entries(repos)" :key="repoName">
        {{ repoName }}
        <ul>
          <li v-for="pr in repo" :key="pr.prId">
            <a :href="`https://github.com/${repoName}/pull/${pr.prId}`">
              <i>#{{ pr.prId }}</i
              >:
              <!-- eslint-disable-next-line vue/no-v-html -->
              <span v-html="pr.title"></span>
            </a>
            <ul v-if="additional[repoName]?.[pr.prId]">
              <li
                v-for="link in additional[repoName]![pr.prId]!"
                :key="link.href"
              >
                <a :href="link.href">
                  {{ link.title }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </template>
  <hr class="divider" />
  <section>
    <p class="lastFetched">Last Fetched: {{ lastFetched }}</p>
  </section>
</template>

<style scoped>
.divider {
  margin-top: 48px;
}

.lastFetched {
  margin-top: 1rem;
  font-size: 0.8rem;
}
</style>
