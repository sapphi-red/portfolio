module.exports = {
  root: true,
  env: {
    browser: true,
    es2017: true
  },
  plugins: ['@typescript-eslint'],
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
      files: ['*.ts'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier/@typescript-eslint'
      ],
      parser: '@typescript-eslint/parser'
    },
    {
      files: ['*.vue'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-recommended',
        'plugin:prettier/recommended',
        'prettier/vue',
        'prettier/@typescript-eslint'
      ],
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    }
  ]
}
