import axios from 'axios'
//获取token
import {getToken} from '@/utils/token.js'
//克隆一个axios对象
let indexRequest=axios.create({
     // 基地址
     baseURL:process.env.VUE_APP_BASEURL,
    //  // 请求头
    //  headers:{
    //      token: getToken()
    //  }
})
// 添加请求拦截器
indexRequest.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log(config)
    //发送请求对该请求拦截添加token
    config.headers.token=getToken()
    return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
indexRequest.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
//获取用户当前信息
export function getInfo(){
    return indexRequest({
        url:"/info",
        method:'get',
    })
}
//退出登录
export function loginOut(){
    return indexRequest({
        url:'/logout',
        method:'get'
    })
}