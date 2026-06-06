declare module 'vue' {
  export interface GlobalComponents {
    TopLayout: (typeof import('./TopLayout.vue'))['default']
    EmbedXPost: (typeof import('./components/EmbedXPost.vue'))['default']
  }
}

export {}
