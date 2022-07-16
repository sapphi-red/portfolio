declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

declare module '~icons/uil/*' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}
