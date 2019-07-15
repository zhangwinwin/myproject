interface ItemTab {
  title: string
  type: string
}
export interface Com {
  initIndex: number
  itemTab: Array<ItemTab>
  loading: number
  leftNavStatus: boolean
  topHeaderStatus: boolean
}

export interface author {
  loginname: string
  avatar_url: string
}
