import { author } from './com'

export interface TopicInfo {
  id: string
  author_id: string
  tab: string
  content: string
  title: string
  last_reply_at: string
  good: boolean
  top: boolean
  reply_count: number
  visit_count: number
  create_at: string
  author: author
}

export interface TopicDetails extends TopicInfo {
  replies: Array<comment>
  is_collect: boolean
  scroll: number
}

export interface comment {
  id: string
  author: author
  content: string
  ups: Array<string>
  create_at: string
  reply_id: string
  is_uped: boolean
  is_author?: boolean
}
