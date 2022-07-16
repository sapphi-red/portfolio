import { ViteSSG } from 'vite-ssg'
import { routes, setRouterNavigationGuards } from './router'
import App from './App.vue'
import { works } from '/@/assets/works'
import type { RouteRecordRaw } from 'vue-router'

export const createApp = ViteSSG(App, { routes }, ({ router }) => {
  setRouterNavigationGuards(router)
})

export async function includedRoutes(
  paths: string[],
  routes: RouteRecordRaw[]
) {
  return routes.flatMap(route => {
    if (route.name === 'work') {
      return works.map(work => `/works/${work.slug}`)
    }
    if (route.name === '404') {
      return '/404'
    }
    return route.path
  })
}
