<template>
  <div>
    <page-title>Skills</page-title>
    <section-title>Programming</section-title>
    <programming-skills />
    <section-title>Other</section-title>
    <other-skills />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageTitle from '/@/components/UI/PageTitle.vue'
import SectionTitle from '/@/components/UI/SectionTitle.vue'
import ProgrammingSkills from '/@/components/Skills/ProgrammingSkills.vue'
import OtherSkills from '/@/components/Skills/OtherSkills.vue'
import { useHead } from '/@/util/head'

export default defineComponent({
  name: 'SkillsPage',
  components: {
    PageTitle,
    SectionTitle,
    ProgrammingSkills,
    OtherSkills
  },
  setup() {
    useHead({
      title: 'Skills'
    })

    return {}
  }
})
</script>
