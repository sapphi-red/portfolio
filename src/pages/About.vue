<template>
  <div>
    <page-title>About</page-title>
    <section-title>Profile</section-title>
    <profile />
    <section-title>Interest</section-title>
    <list :data="interest" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageTitle from '/@/components/UI/PageTitle.vue'
import SectionTitle from '/@/components/UI/SectionTitle.vue'
import Profile from '/@/components/About/Profile.vue'
import List from '/@/components/UI/List.vue'
import { TreeData } from '../data'

const interest: TreeData = [
  { name: 'Developer Experienceを向上させること' },
  {
    name: '今後WebアプリとブラウザとOSの関係性がどう変化していくか'
  }
]

export default defineComponent({
  name: 'About',
  components: {
    PageTitle,
    SectionTitle,
    Profile,
    List
  },
  setup() {
    return { interest }
  }
})
</script>
