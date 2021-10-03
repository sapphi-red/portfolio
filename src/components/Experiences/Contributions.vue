<template>
  <ul>
    <li v-for="[repoName, repo] in PRData.repos" :key="repoName">
      {{ repoName }}
      <ul>
        <li v-for="pr in repo" :key="pr.prId">
          <a :href="pr.url">#{{ pr.prId }}: {{ pr.title }}</a>
          <ul v-if="additional[repoName]?.[pr.prId]">
            <li>
              <a :href="additional[repoName][pr.prId].href">
                {{ additional[repoName][pr.prId].title }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
  <p :class="$style.lastFetched">最終取得: {{ lastFetched }}</p>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import PRData from '/@/assets/prs.json'
import { dateToDateTimeString } from '/@/util/date'

type PRDataType = typeof PRData
type CorrectPRDataType = {
  [K in keyof PRDataType]: K extends 'repos'
    ? CorrectPRsType<PRDataType[K]>
    : PRDataType[K]
}
type CorrectPRsType<T extends unknown[][]> = [
  string,
  Exclude<T[number][number], string>
][]

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
  }
}

export default defineComponent({
  name: 'Contributions',
  setup() {
    const lastFetched = computed(() =>
      dateToDateTimeString(new Date(PRData.fetchedAt))
    )
    return { PRData: PRData as CorrectPRDataType, additional, lastFetched }
  }
})
</script>

<style lang="scss" module>
.lastFetched {
  margin-top: 1rem;
  font-size: 0.8rem;
}
</style>
