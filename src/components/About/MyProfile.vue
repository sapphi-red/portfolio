<template>
  <div :class="$style.container">
    <img :class="$style.icon" src="/sapphi-red.png" decoding="async" />
    <div :class="$style.desc">
      <h3>翠 (みどり)</h3>
      <p>所属: 東京工業大学 工学院 情報通信系 B3</p>
      <p>
        サークル:
        <a href="https://trap.jp">デジタル創作同好会traP</a>
      </p>
      <p>フロントエンドを中心にバックエンドとインフラも触ってます。</p>
      <ul>
        <li>
          <a-icon name="github-alt" />
          GitHub:
          <a href="https://github.com/sapphi-red">@sapphi-red</a>
        </li>
        <li>
          <a-icon name="twitter-alt" />
          Twitter:
          <a href="https://twitter.com/sapphi_red">@sapphi_red</a>
        </li>
        <li>
          <a-icon name="pen" />
          traPブログ:
          <a href="https://trap.jp/author/sappi_red">記事一覧</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AIcon from '/@/components/UI/AIcon.vue'
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-flow: row wrap;
}

.icon {
  flex: 1;
  max-width: 320px;
  margin-right: 2em;
  border-radius: 0.3rem;
  object-fit: contain;
}
.desc {
  flex: 1;
  min-width: 15em;
}
</style>
