<template>
  <div>
    <page-title>About</page-title>
    <section-title>Profile</section-title>
    <profile />
    <section-title>Interest</section-title>
    <p>興味～～～～～ある</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageTitle from '/@/components/UI/PageTitle.vue'
import SectionTitle from '/@/components/UI/SectionTitle.vue'
import Profile from '/@/components/About/Profile.vue'

export default defineComponent({
  name: 'About',
  components: {
    PageTitle,
    SectionTitle,
    Profile
  }
})
</script>
