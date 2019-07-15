import { author } from './com'
import { TopicInfo } from './detail'
import { MessageInfo } from './message'

export interface RecentInfo {
  id: string
  author: author
  title: string
  last_reply_at: string
}

export interface UserInfo {
  loginname: string
  avatar_url: string
  githubUsername: string
  create_at: string
  score: number
  recent_topics: Array<RecentInfo>
  recent_replies: Array<RecentInfo>
  collect?: Array<TopicInfo>
}
