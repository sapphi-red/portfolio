<template>
  <ul>
    <li v-for="[repoName, repo] in PRData.repos" :key="repoName">
      {{ repoName }}
      <ul>
        <li v-for="pr in repo" :key="pr.prId">
          <a :href="pr.url"
            ><i>#{{ pr.prId }}</i
            >: {{ pr.title }}</a
          >
          <ul v-if="additional[repoName]?.[pr.prId]">
            <li>
              <a :href="additional[repoName]![pr.prId]!.href">
                {{ additional[repoName]![pr.prId]!.title }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
  <p :class="$style.lastFetched">最終取得: {{ lastFetched }}</p>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import PRDataRaw from '/@/assets/prs.json'
import { dateToDateTimeString } from '/@/util/date'

type PRDataType = typeof PRDataRaw
type CorrectPRDataType = {
  [K in keyof PRDataType]: K extends 'repos'
    ? CorrectPRsType<PRDataType[K]>
    : PRDataType[K]
}
type CorrectPRsType<T extends unknown[][]> = [
  string,
  Exclude<T[number][number], string>
][]

const PRData = PRDataRaw as CorrectPRDataType

const additional: Record<
  string,
  Record<number, { title: string; href: string }>
> = {
  'tensorflow/tfjs': {
    2543: {
      title:
        '関連ブログ記事: TensorFlow.jsでwasmを使ってみるためにコントリビュートした',
      href: 'https://trap.jp/post/927/'
    }
  },
  'protobufjs/protobuf.js': {
    1446: {
      title: '関連ブログ記事: 裏ハッカソン参加記「Emoine」',
      href: 'https://trap.jp/post/1093/'
    }
  },
  'vueuse/vueuse': {
    468: {
      title: '関連ブログ記事: CPCTF2021を実現させたスコアサーバー',
      href: 'https://trap.jp/post/1308/'
    }
  }
}

const lastFetched = computed(() =>
  dateToDateTimeString(new Date(PRData.fetchedAt))
)
</script>

<style lang="scss" module>
.lastFetched {
  margin-top: 1rem;
  font-size: 0.8rem;
}
</style>
