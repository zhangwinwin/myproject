import { author } from './com'

export interface MessageInfo {
  id: string
  type: string
  has_read: boolean
  author: author
  topic: {
    id: string
    title: string
    last_reply_at: string
  }
  reply: {
    id: string
    content: string
    ups: Array<string>
    create_at: string
  }
  create_at: string
}

export interface Message {
  has_read_messages: Array<MessageInfo>
  hasnot_read_messages: Array<MessageInfo>
}
