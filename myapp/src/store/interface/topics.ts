interface SearchKey {
  page: number,
  limit: number,
  tab: string
}
export interface Topics {
  topicsList: string[],
  searchKey: SearchKey,
  scroll: boolean
}
