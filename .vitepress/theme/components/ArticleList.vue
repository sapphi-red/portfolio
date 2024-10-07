<script setup lang="ts">
import { data as posts } from './posts.data.ts'
</script>

<template>
  <ul class="no-style">
    <li v-for="{ title, url, date, excerpt } of posts">
      <article>
        <time :datetime="date.datetimeString">{{ date.string }}</time>
        <div>
          <h2>
            <a :href="url">{{ title }}</a>
          </h2>
          <div v-if="excerpt" v-html="excerpt"></div>
        </div>
      </article>
    </li>
  </ul>
</template>
