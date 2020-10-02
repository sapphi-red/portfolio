<template>
  <page-title>About</page-title>
  <section-title>Profile</section-title>
  <profile />
  <section-title>Interest</section-title>
  <p>興味～～～～～ある</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageTitle from '/@/components/PageTitle.vue'
import SectionTitle from '/@/components/SectionTitle.vue'
import Profile from '/@/components/Profile.vue'

export default defineComponent({
  name: 'Hello',
  components: {
    PageTitle,
    SectionTitle,
    Profile
  }
})
</script>
