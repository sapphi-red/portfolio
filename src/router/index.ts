/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import type { TransitionProps } from 'vue'
import type { Router, RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface RouteMeta {
    showInRoutes?: true
    noScrollReset?: true

    transition?: string
    transitionMode?: TransitionProps['mode']
  }
}

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
  {
    path: `/works/:workSlug`,
    name: `work`,
    component: () => import('/@/pages/WorksPage.vue'),
    props: true,
    meta: { noScrollReset: true }
  },
  {
    path: '/:catchAll(.*)',
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
