import Vue from 'vue'
//导入vuex
import Vuex from 'vuex'
Vue.use(Vuex)
//实例化仓库对象
const store=new Vuex.Store({
    //数据
    state:{
        username:'',
        avatar:''
    },
    //方法
    mutations:{
        //操作昵称方法
        changeUsername(state,val){
            //改成传进来的值
            state.username=val
        },
        //操作图片方法
        changeAvatar(state,val){
            state.avatar=val
        }
    }
})
export default store