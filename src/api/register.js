//导入axios
import axios from 'axios'

//暴露
export function sendSMS(data){
   return axios({
        url:process.env.VUE_APP_BASEURL+'/sendsms',
        method:'post',
        data,
        withCredentials:true
    })
}

//注册
export function register(data){
    return axios({
        url:process.env.VUE_APP_BASEURL+'/register',
        method:"post",
        data,
        withCredentials:true
    })
}