<script setup lang="ts">
import { dateToDateString } from '../common/date'
import { talks } from './assets/talks'
import TalkItemTag from './TalkItemTag.vue'
import TalkItemIcon from './TalkItemIcon.vue'
</script>

<template>
  <ul>
    <li
      v-for="{ title, date, eventName, links, tags } of talks"
      :key="title"
      class="item"
    >
      <article>
        <div class="tags">
          <TalkItemTag v-for="tag in tags" :key="tag" :tag="tag" />
        </div>
        <h2 class="title">{{ title }}</h2>
        <div class="info">
          <time :datetime="dateToDateString(date, '-')" class="date">{{
            date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })
          }}</time>
          <span class="splitter">-</span>
          <span>{{ eventName }}</span>
        </div>
        <div v-if="links && links.length > 0" class="links">
          <a
            v-for="link in links"
            :key="link.url"
            :href="link.url"
            class="link"
          >
            <TalkItemIcon :type="link.type" class="link-icon" />
            {{
              link.title ??
              link.type.slice(0, 1).toUpperCase() + link.type.slice(1)
            }}
          </a>
        </div>
      </article>
    </li>
  </ul>
</template>

<style scoped>
.item {
  margin: 48px 0;
  &::before {
    content: none !important;
  }
  &:first-child {
    margin-top: 0;
  }
}

.tags {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  gap: 0.25em;
}

.title {
  border: none;
  margin: 0;
  margin-top: 4px;
  padding: 0;
}

.info {
  display: flex;
  flex-flow: row;
  align-items: center;
  font-size: 14px;
}

.splitter {
  margin: 0 0.5em;
}

.links {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  gap: 0.5em;
}
.link {
  display: flex;
  align-items: center;
}
.link-icon {
  margin-right: 0.1em;
}
</style>
