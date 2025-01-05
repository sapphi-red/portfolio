export const ignoreRepoUser = new Set([
  'traPtitech',
  'sapphi-red',
  'FujishigeTemma',
  'isucon'
])

export const ignoreRepo = new Set([
  'aquaproj/aqua-registry',
  'vitejs/vite-plugin-vue2',
  'rolldown/vite'
])

export const ignorePRs = new Set([
  'https://github.com/antfu/purge-icons/pull/12',
  'https://github.com/vueuse/vue-chemistry/pull/5',
  'https://github.com/caarlos0/domain_exporter/pull/87',
  'https://github.com/reyu0722/koudaisai-homepage/pull/65',
  'https://github.com/vitejs/vite/pull/7434',
  'https://github.com/vitejs/vite/pull/7471',
  'https://github.com/vitejs/vite/pull/7480',
  'https://github.com/vitejs/vite/pull/8874',
  'https://github.com/vitejs/vite/pull/9489',
  'https://github.com/vitejs/vite/pull/14821',
  'https://github.com/vitejs/vite/pull/15093',
  'https://github.com/vitejs/vite/pull/18818',
  'https://github.com/vitejs/vite/pull/18927',
  'https://github.com/vitejs/vite-ecosystem-ci/pull/256',
  'https://github.com/vitejs/vite-ecosystem-ci/pull/261',
  'https://github.com/madyankin/postcss-modules/pull/134',
  'https://github.com/madyankin/postcss-modules/pull/135',
  'https://github.com/rollup/plugins/pull/1260',
  'https://github.com/vuejs/core/pull/2818',
  'https://github.com/vitejs/vite-plugin-vue/pull/37',
  'https://github.com/vitejs/vite-plugin-vue/pull/224',
  'https://github.com/vitejs/vite-plugin-vue/pull/286',
  'https://github.com/vitejs/vite-plugin-vue/pull/481',
  'https://github.com/Rich-Harris/magic-string/pull/215',
  'https://github.com/antfu-collective/vite-plugin-inspect/pull/54',
  'https://github.com/bluwy/publint/pull/8',
  'https://github.com/unplugin/unplugin-vue-markdown/pull/18',
  'https://github.com/unocss/unocss/pull/2662',
  'https://github.com/kaz/pprotein/pull/35',
  'https://github.com/vite-pwa/vite-plugin-pwa/pull/590',
  'https://github.com/rolldown/rolldown/pull/986',
  'https://github.com/antfu-collective/vite-ssg/pull/399',
  'https://github.com/napi-rs/napi-rs/pull/2020',
  'https://github.com/napi-rs/napi-rs/pull/2382',
  'https://github.com/vitest-dev/vitest/pull/6896',
  'https://github.com/rolldown/rolldown/pull/2688',
  'https://github.com/rolldown/rolldown/pull/2907',
  'https://github.com/rolldown/rolldown/pull/2917',
  'https://github.com/rolldown/rolldown/pull/2971',
  'https://github.com/oxc-project/oxc/pull/8175'
])

export const forcedPrs = new Set([
  'https://github.com/vuejs/create-vue/pull/121',
  'https://github.com/yyx990803/launch-editor/pull/42',
  'https://github.com/kekee000/fonteditor-core/pull/47',
  'https://github.com/rollup/rollup/pull/5471',
  'https://github.com/rollup/rollup/pull/5284',
  'https://github.com/rollup/rollup/pull/5267',
  'https://github.com/vitejs/vite/pull/9007',
  'https://github.com/vitejs/vite/pull/8459',
  'https://github.com/vitejs/vite/pull/7098'
])

export const lineChangeThresholds = {
  'vitejs/vite': 80,
  'vitejs/vite-plugin-vue': 80,
  'vitejs/vite-plugin-react': 80,

  'vitejs/docs-ja': 80,

  'vitejs/vite-ecosystem-ci': 80,
  'vitest-dev/vitest-ecosystem-ci': 80,
  'rollup/rollup': 80,
  'rolldown/rolldown': 80,
  'oxc-project/oxc': 80,

  'withastro/astro': 80,
  'solidjs/solid-start': 80,
  'preactjs/preset-vite': 80,
  'histoire-dev/histoire': 80,
  'vikejs/vike': 80,

  'vuejs/composition-api': 10
}
