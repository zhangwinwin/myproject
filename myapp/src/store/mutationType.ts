/**
 * Mutations事件类型
 */

 //公共com.js
 export const COM_ITEM_TAB       = 'COM_ITEM_TAB'
 export const COM_INIT_INDEX     = 'COM_INIT_INDEX'
 export const COM_NAV_STATUS     = 'COM_NAV_STATUS'
 export const COM_HEADER_STATUS  = 'COM_HEADER_STATUS'
 export const COM_LOADING_STATUS = 'COM_LOADING_STATUS'

 //用户user.js
 export const SET_USER_INFO      = 'SET_USER_INFO'      //设置用户信息
 export const SET_LOGIN_STATUS   = 'SET_LOGIN_STATUS'   //设置登录状态
 export const GET_USER_DATA      = 'GET_USER_DATA'      //获取用户数据信息

 //topics主题topics.js
 export const GET_TOPICS_LIST    = 'GET_TOPICS_LIST'    //获取主题列表
 export const GET_SEARCH_KEY     = 'GET_SEARCH_KEY'     //获取主题列表参数
 export const GET_SCORLL_STATUS  = 'GET_SCORLL_STATUS'  //滚动加载状态
 export const GET_PAGE_NUM       = 'GET_PAGE_NUM'       //获取主题页数

 //detail主题详情detail.js
 export const GET_TOPICS_DETAIL  = 'GET_TOPICS_DETAIL'  //获取主题详情

 //message信息message.js
 export const GET_MESSAGE_LIST   = 'GET_MESSAGE_LIST'   //获取信息列表