import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import vue from 'eslint-plugin-vue'
import toml from 'eslint-plugin-toml'
import globals from 'globals'

export default tseslint.config(
  {
    languageOptions: {
      sourceType: 'module',
      globals: { ...globals.browser }
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error'
    }
  },
  eslint.configs.recommended,
  ...[...tseslint.configs.recommended, ...tseslint.configs.stylistic].map(c => {
    if (c.name === 'typescript-eslint/eslint-recommended') {
      // apply to `<script lang='ts'>` in `.vue` files
      // don't apply to `.toml` files
      c.files = ['**/*.{c|m|}ts', '**/*.vue']
    }
    if (
      c.name === 'typescript-eslint/recommended' ||
      c.name === 'typescript-eslint/stylistic'
    ) {
      // don't apply to `.toml` files
      c.files = ['**/*.{c|m|}{jt}s', '**/*.vue']
    }
    return c
  }),
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    }
  },
  ...toml.configs['flat/standard'],
  {
    files: ['**/*.toml'],
    rules: {
      'toml/indent': ['error', 2, { subTables: 1 }]
    }
  },
  {
    files: ['**/*.{c|m|}{jt}s', '**/*.vue'],
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      'vue/require-default-prop': 'off',
      'vue/enforce-style-attribute': 'error',
      'vue/block-lang': [
        'error',
        {
          script: { lang: 'ts' }
        }
      ],
      'vue/component-api-style': ['error', ['script-setup']]
    }
  },
  eslintConfigPrettier,
  {
    ignores: ['dist/**', '.vercel/**', '.vscode/**', '.vitepress/cache/**']
  }
)
