import { getToken } from '~/composables/auth'
import { toast } from '~/composables/util'
import axios from 'axios'
import { useStore } from 'vuex'

const service = axios.create({
  baseURL: "/api"
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  //在发送请求之前做点什么
  const token = getToken()
  if(token){
    config.headers["token"] = token
  }
  return config
}, function (error) {
  // 对请求错误做点什么
  return Promise.reject(error)
})

// 添加相应拦截器
service.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data.data;
}, function (error) {
  const msg = error.response.data.msg || "请求失败"
  if(msg == "非法token，请先登录"){
    const store = useStore()
    store.dispatch("logout").finally(()=>location.reload())
  }
  toast(msg, "error")
  return Promise.reject(error);
})

export default service