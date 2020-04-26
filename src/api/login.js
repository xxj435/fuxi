//导入axios
import axios from 'axios'

//暴露
export function toLogin(data){
    return axios({
        url:process.env.VUE_APP_BASEURL+"/login",
        method:"post",
        data,
        withCredentials:true
    })
}
