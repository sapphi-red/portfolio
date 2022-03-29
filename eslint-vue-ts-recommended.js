/**
 * plugin:@typescript-eslint/eslint-recommended
 *
 * @typescript-eslint/eslint-recommendedはoverridesが['*.ts','*.tsx']になっている
 * そのため、`.vue`内の`<script lang='ts'>`に適用されない
 * 適用されるようにするためにoverridesに'*.vue'を追加する
 */

const typescriptEslintEslintRecommended = require('@typescript-eslint/eslint-plugin/dist/configs/eslint-recommended')

module.exports = {
  ...typescriptEslintEslintRecommended,
  overrides: typescriptEslintEslintRecommended.overrides.map(override => {
    if (override.files.includes('*.ts')) {
      return { ...override, files: [...override.files, '*.vue'] }
    }
    return override
  })
}
