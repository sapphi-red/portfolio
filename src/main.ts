import { ViteSSG } from 'vite-ssg'
import { routes, setRouterNavigationGuards } from './router'
import App from './App.vue'

import '@purge-icons/generated'

export const createApp = ViteSSG(App, { routes }, ({ router }) => {
  setRouterNavigationGuards(router)
})
