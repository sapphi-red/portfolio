<template>
  <div>
    <page-title>About</page-title>
    <section-title>Profile</section-title>
    <my-profile />
    <section-title>Interest</section-title>
    <a-list :data="interest" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageTitle from '/@/components/UI/PageTitle.vue'
import SectionTitle from '/@/components/UI/SectionTitle.vue'
import MyProfile from '/@/components/About/MyProfile.vue'
import AList from '/@/components/UI/AList.vue'
import { useHead } from '/@/util/head'
import { TreeData } from '../data'

const interest: TreeData = [
  { name: 'Developer Experienceを向上させること' },
  {
    name: '今後WebアプリとブラウザとOSの関係性がどう変化していくか'
  }
]

export default defineComponent({
  name: 'AboutPage',
  components: {
    PageTitle,
    SectionTitle,
    MyProfile,
    AList
  },
  setup() {
    useHead({
      title: 'About'
    })
    return { interest }
  }
})
</script>
