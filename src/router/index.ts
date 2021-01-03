/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Router, RouteRecordRaw } from 'vue-router'
import { works } from '/@/assets/works'

declare module 'vue-router' {
  interface RouteMeta {
    showInRoutes?: true
  }
}

type Route = RouteRecordRaw & { meta?: { showInRoutes?: true } }

const worksRoutes: Route[] = works.map(work => ({
  path: `/works/${work.slug}`,
  name: `work-${work.slug}`,
  component: () => import('/@/pages/Works.vue'),
  props: { workSlug: work.slug }
}))

export const routes: Route[] = [
  {
    path: '/',
    name: 'index',
    component: () => import('/@/pages/Index.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('/@/pages/About.vue'),
    meta: { showInRoutes: true }
  },
  {
    path: '/skills',
    name: 'skills',
    component: () => import('/@/pages/Skills.vue'),
    meta: { showInRoutes: true }
  },
  {
    path: '/experiences',
    name: 'experiences',
    component: () => import('/@/pages/Experiences.vue'),
    meta: { showInRoutes: true }
  },
  {
    path: '/works',
    name: 'works',
    component: () => import('/@/pages/Works.vue'),
    meta: { showInRoutes: true }
  },
  ...worksRoutes
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
