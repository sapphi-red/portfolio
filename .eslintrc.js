module.exports = {
  root: true,
  env: {
    browser: true,
    es2017: true,
    es2020: true
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn'
  },
  overrides: [
    {
      files: ['./scripts/**/*.js', './*.js'],
      env: {
        browser: false,
        node: true
      }
    },
    {
      files: ['./scripts/**/*.mjs', './*.mjs'],
      env: {
        browser: false,
        node: true
      },
      parserOptions: {
        sourceType: 'module'
      }
    },
    {
      files: ['*.ts'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
      ],
      parser: '@typescript-eslint/parser'
    },
    {
      files: ['*.vue'],
      extends: [
        'eslint:recommended',
        './eslint-vue-ts-recommended.js',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-recommended',
        'plugin:prettier/recommended'
      ],
      parserOptions: {
        parser: '@typescript-eslint/parser'
      },
      rules: {
        'vue/block-lang': [
          'error',
          {
            script: { lang: 'ts' },
            style: { lang: 'scss' }
          }
        ]
      }
    },
    {
      files: ['*.toml'],
      extends: ['plugin:toml/standard'],
      rules: {
        'prettier/prettier': 'off',
        'toml/indent': ['error', 2, { subTables: 1 }]
      }
    }
  ]
}
