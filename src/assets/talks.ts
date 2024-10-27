import _talks from './data/talks.const.toml'
import type { DeepReadonly } from 'ts-essentials'

type RawTalk = {
  title: string
  date: string
  eventName: string
  tags: Array<`Content: ${string}` | `Type: ${string}` | `Language: ${string}`>
  links?: Array<{
    type: 'slides' | 'video' | 'article'
    title?: string
    url: string
  }>
}

export type Talk = Omit<RawTalk, 'date'> & {
  date: Date
}

export const talks: DeepReadonly<Talk[]> = _talks.talks
  .map((t: DeepReadonly<RawTalk>) => ({
    ...t,
    date: new Date(t.date)
  }))
  .reverse()
