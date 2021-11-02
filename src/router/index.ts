/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Router, RouteRecordRaw } from 'vue-router'
import { works } from '/@/assets/works'

declare module 'vue-router' {
  interface RouteMeta {
    showInRoutes?: true
  }
}

const worksRoutes: RouteRecordRaw[] = works.map(work => ({
  path: `/works/${work.slug}`,
  name: `work-${work.slug}`,
  component: () => import('../pages/WorksPage.vue'),
  props: { workSlug: work.slug }
}))

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    component: () => import('/@/pages/IndexPage.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('/@/pages/AboutPage.vue'),
    meta: { showInRoutes: true }
  },
  {
    path: '/skills',
    name: 'skills',
    component: () => import('/@/pages/SkillsPage.vue'),
    meta: { showInRoutes: true }
  },
  {
    path: '/experiences',
    name: 'experiences',
    component: () => import('/@/pages/ExperiencesPage.vue'),
    meta: { showInRoutes: true }
  },
  {
    path: '/works',
    name: 'works',
    component: () => import('/@/pages/WorksPage.vue'),
    meta: { showInRoutes: true }
  },
  ...worksRoutes,
  {
    path: '/:catchAll(.*)',
    name: '404-catchall',
    component: () => import('/@/pages/404Page.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('/@/pages/404Page.vue')
  }
]

export const setRouterNavigationGuards = (router: Router) => {
  router.afterEach((to, from) => {
    // 初回表示はfrom.nameがundefined
    if (from.name === undefined) {
      to.meta.transition = ''
      return
    }

    if (to.name === 'index') {
      to.meta.transition = 'index-enter'
      to.meta.transitionMode = 'in-out'
    }
    if (from.name === 'index') {
      to.meta.transition = 'index-leave'
    }
  })
}
