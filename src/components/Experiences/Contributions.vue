<template>
  <ul v-for="[repoName, repo] in PRData.repos" :key="repo">
    <li>
      {{ repoName }}
      <ul v-for="pr in repo" :key="pr">
        <li>
          <a :href="pr.url">#{{ pr.prId }}: {{ pr.title }}</a>
          <template v-if="additional[repoName]?.[pr.prId]">
            <a :href="additional[repoName][pr.prId].href">
              {{ additional[repoName][pr.prId].title }}
            </a>
          </template>
        </li>
      </ul>
    </li>
  </ul>
  <p>最終取得: {{ PRData.fetchedAt }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PRData from '/@/assets/prs.json'

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
      title: 'ブログ記事',
      href: 'https://trap.jp/post/927/'
    }
  }
}

export default defineComponent({
  name: 'Contributions',
  setup() {
    return { PRData: PRData as CorrectPRDataType, additional }
  }
})
</script>

<style lang="scss" module>
.container {
}
</style>
