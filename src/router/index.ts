import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'

const routerHistory = createWebHistory()

export const routes = [
  {
    path: '/',
    name: 'index',
    component: defineAsyncComponent(() => import('/@/pages/Index.vue'))
  },
  {
    path: '/about',
    name: 'about',
    component: defineAsyncComponent(() => import('/@/pages/About.vue'))
  },
  {
    path: '/skills',
    name: 'skills',
    component: defineAsyncComponent(() => import('/@/pages/Skills.vue'))
  },
  {
    path: '/experiences',
    name: 'experiences',
    component: defineAsyncComponent(() => import('/@/pages/Experiences.vue'))
  },
  {
    path: '/works',
    name: 'works',
    component: defineAsyncComponent(() => import('/@/pages/Works.vue'))
  }
]

export default createRouter({
  history: routerHistory,
  routes
})
