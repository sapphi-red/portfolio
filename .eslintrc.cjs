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
      files: ['./*.cjs'],
      env: {
        browser: false,
        node: true
      }
    },
    {
      files: ['./scripts/**/*.js', './*.js'],
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
      parser: '@typescript-eslint/parser',
      rules: {
        '@typescript-eslint/consistent-type-imports': 'error'
      }
    },
    {
      files: ['*.vue'],
      extends: [
        'eslint:recommended',
        './eslint-vue-ts-recommended.cjs',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-recommended',
        'plugin:prettier/recommended'
      ],
      parserOptions: {
        parser: '@typescript-eslint/parser'
      },
      rules: {
        '@typescript-eslint/consistent-type-imports': 'error',
        'vue/require-default-prop': 'off',
        'vue/block-lang': [
          'error',
          {
            script: { lang: 'ts' },
            style: { lang: 'scss' }
          }
        ],
        'vue/component-api-style': ['error', ['script-setup']]
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
