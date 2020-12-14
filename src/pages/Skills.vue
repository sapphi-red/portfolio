<template>
  <div>
    <page-title>Skills</page-title>
    <section-title>Programming</section-title>
    <programming />
    <section-title>Other</section-title>
    <other-skills />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageTitle from '/@/components/UI/PageTitle.vue'
import SectionTitle from '/@/components/UI/SectionTitle.vue'
import Programming from '/@/components/Skills/Programming.vue'
import OtherSkills from '/@/components/Skills/OtherSkills.vue'

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
