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

export const tags = new Set(tagsArr)

export type Tag = typeof tagsArr[number]

interface Article {
  title: string
  link: string
}

export interface Work {
  slug: string
  name: string
  desc: string
  img?: string
  tags: Set<Tag>
  articles: Article[]
}

export const works: Work[] = [
  {
    slug: 'to-fix-workshop',
    name: 'プログラムを手懐ける講習会',
    desc: 'サークルで行った講習会です。',
    tags: new Set(['講習会', 'サークル']),
    articles: []
  },
  {
    slug: 'css-essence-workshop',
    name: 'CSSの†本質情報†を知る会',
    desc: 'サークルで行った講習会です。',
    img: 'css-essence-workshop.png',
    tags: new Set(['講習会', 'サークル']),
    articles: []
  },
  {
    slug: 'traq-r-frontend',
    name: 'traQ-R フロントエンド',
    desc: `
サークルで開発しているサークル内向けのコミュニケーションツールです。
現在はtraQ-Sと呼ばれるバージョンに移行しており、これはその前のバージョンです。
このバージョンで自分は次のような機能を実装しました。

<ul>
  <li>OAuth Client管理画面</li>
  <li>通知から返信できる機能</li>
  <li>LaTeX対応</li>
  <li>spoiler記法</li>
  <li>Enterでの送信</li>
  <li>スタンプエフェクトの追加</li>
  <li>パフォーマンス改善</li>
</ul>
`,
    img: 'traq-r-frontend.png',
    tags: new Set(['JavaScript', 'Sass/SCSS', 'Pug', 'Vue.js', 'サークル']),
    articles: [
      {
        title: 'traQのmarkdownのパースをWeb Workerでやるようにした話',
        link: 'https://trap.jp/post/816/'
      },
      {
        title: 'ソースコード',
        link: 'https://github.com/traPtitech/traQ_S-UI'
      }
    ]
  },
  {
    slug: 'emoine-2020',
    name: 'Emoine',
    desc: `
サークルで開催されたハッカソンで制作したハッカソン用の発表ツールです。
例年ハッカソンは対面で行っていたのですが、2020年は新型コロナの影響でオンライン開催しました。
その際に利用するためにライブ配信を埋め込んでコメント・リアクション機能と結果集計機能を実装しました。
`,
    tags: new Set([
      'JavaScript',
      'TypeScript',
      'Vue.js',
      'Sass/SCSS',
      'Protocol Buffers',
      'サークル'
    ]),
    articles: [
      {
        title: '裏ハッカソン参加記「Emoine」',
        link: 'https://trap.jp/post/1093/'
      }
    ]
  }
]
