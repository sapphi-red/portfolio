declare module '*.css' {
  export default undefined
}
declare module '*.scss' {
  export default undefined
}

declare module '*.module.css' {
  const value: Record<string, string>
  export default value
}
declare module '*.module.scss' {
  const value: Record<string, string>
  export default value
}
