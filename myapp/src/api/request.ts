import axios from 'axios'
import { AxiosResponse, AxiosRequestConfig } from 'axios'
import env from './env'

let baseURL: string =  `${env.host} + ${env.baseURL}`

const service = axios.create({
  baseURL,
  timeout: 0,
  headers: { "X-Requested-With": "XMLHttpRequest" },
  maxContentLength: 4000
})

service.interceptors.request.use((config: AxiosRequestConfig) => {
  return config
}, (error: any) => {
  Promise.reject(error)
})

service.interceptors.response.use((response: AxiosResponse) => {
  if (response.status !== 200) {
    console.log('请求错误')
  } else {
    return response.data
  }
}, (error: any) => {
  return Promise.reject(error)
})

export default service
