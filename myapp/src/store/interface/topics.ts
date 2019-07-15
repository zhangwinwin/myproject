import { author } from './com'
import { TopicInfo } from './detail'

export interface SearchKey {
  page: number
  limit: number
  tab: string
}
export interface Topics {
  topicsList: Array<TopicInfo>
  searchKey: SearchKey
  scroll: boolean
}
