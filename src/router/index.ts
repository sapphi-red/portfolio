import { createRouter, createWebHistory } from 'vue-router'
import Index from '/@/pages/Index.vue'
import About from '/@/pages/About.vue'
import Skills from '/@/pages/Skills.vue'
import Experiences from '/@/pages/Experiences.vue'
import Works from '/@/pages/Works.vue'

const routerHistory = createWebHistory()

export const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/skills',
    name: 'skills',
    component: Skills
  },
  {
    path: '/experiences',
    name: 'experiences',
    component: Experiences
  },
  {
    path: '/works',
    name: 'works',
    component: Works
  }
]

export default createRouter({
  history: routerHistory,
  routes
})
