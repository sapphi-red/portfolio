<template>
  <page-title>Skills</page-title>
  <section-title>Programming</section-title>
  <programming />
  <section-title>Other</section-title>
  <other-skills />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageTitle from '/@/components/PageTitle.vue'
import SectionTitle from '/@/components/SectionTitle.vue'
import Programming from '/@/components/Programming.vue'
import OtherSkills from '/@/components/OtherSkills.vue'

export default defineComponent({
  name: 'Skills',
  components: {
    PageTitle,
    SectionTitle,
    Programming,
    OtherSkills
  }
})
</script>
