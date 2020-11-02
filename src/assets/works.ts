type Tag = '講習会'

export interface Work {
  name: string
  desc: string
  tags: Set<Tag>
}

export const works: Work[] = [
  {
    name: 'プログラムのミス(バグ含む)を修正するため',
    desc: 'サークルで行った講習会です。',
    tags: new Set(['講習会'])
  },
  {
    name: 'CSSの†本質情報†を知る',
    desc: 'サークルで行った講習会です。',
    tags: new Set(['講習会'])
  }
]
