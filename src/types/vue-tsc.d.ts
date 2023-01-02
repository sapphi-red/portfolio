// vue-tsc実行時のみ参照する

// vue-tscがtypescript pluginに対応していないため
// https://github.com/johnsoncodehk/volar/issues/1005

declare module '*.toml' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any
  export default data
}
