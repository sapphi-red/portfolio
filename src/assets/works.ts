import _works from './data/works.const.toml'

const tagsArr = [
  '講習会',
  'JavaScript',
  'TypeScript',
  'Sass/SCSS',
  'Pug',
  'Vue.js',
  'Protocol Buffers',
  'サークル'
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
