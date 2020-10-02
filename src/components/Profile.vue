<template>
  <div :class="$style.container">
    <img :class="$style.icon" src="/sapphi-red.png" />
    <div :class="$style.desc">
      <h3>翠 (みどり)</h3>
      <p>所属: 東京工業大学 工学院 情報通信系 B2</p>
      <p>サークル: <a href="https://trap.jp">デジタル創作同好会traP</a></p>
      <p>フロントエンドを中心にバックエンドとインフラも触ってます。</p>
      <ul>
        <li>GitHub: <a href="https://github.com/sapphi-red">@sapphi-red</a></li>
        <li>
          Twitter: <a href="https://twitter.com/sapphi_red">@sapphi_red</a>
        </li>
        <li>
          traPブログ: <a href="https://trap.jp/author/sappi_red">記事一覧</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Profile'
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-flow: row wrap;
}

.icon {
  flex: 1;
  max-width: 320px;
}
.desc {
  flex: 1;
}
</style>
