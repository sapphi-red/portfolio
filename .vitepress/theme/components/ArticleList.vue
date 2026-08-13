<script setup lang="ts">
import { data as posts } from './posts.data.ts'
</script>

<template>
  <ul>
    <li v-for="{ title, url, date } of posts" :key="url">
      <article>
        <time :datetime="date.datetimeString" class="date">{{
          date.string
        }}</time>
        <div>
          <h2 class="title">
            <a :href="url">{{ title }}</a>
          </h2>
        </div>
      </article>
    </li>
  </ul>
</template>

<style scoped>
li::before {
  content: none !important;
}

.date {
  font-size: 14px;
}

.title {
  border: none;
  margin-top: 0;
  padding-top: 0;
}
</style>
