/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createRouter, createWebHistory } from 'vue-router'

const routerHistory = createWebHistory()

export const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('/@/pages/Index.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('/@/pages/About.vue')
  },
  {
    path: '/skills',
    name: 'skills',
    component: () => import('/@/pages/Skills.vue')
  },
  {
    path: '/experiences',
    name: 'experiences',
    component: () => import('/@/pages/Experiences.vue')
  },
  {
    path: '/works/:workSlug?',
    name: 'works',
    component: () => import('/@/pages/Works.vue')
  }
]

export default createRouter({
  history: routerHistory,
  routes
})
