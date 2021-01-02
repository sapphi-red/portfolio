import _works from './data/works.const.toml'

const tagsArr = [
  'JavaScript',
  'TypeScript',
  'Vue.js',
  'React',
  'CSS',
  'Sass/SCSS',
  'Pug',
  'Go',
  'Protocol Buffers',
  'toml',
  '静的解析',
  'サークル',
  '講習会'
] as const

export const tags = new Set(tagsArr) as ReadonlySet<Tag>

export type Tag = typeof tagsArr[number]

export interface Article {
  readonly title: string
  readonly link: string
}

export interface Work {
  readonly slug: string
  readonly name: string
  readonly desc: string
  readonly img?: string
  readonly tags: readonly Tag[]
  readonly articles: readonly Article[]
}

export const works: readonly Work[] = _works.works
