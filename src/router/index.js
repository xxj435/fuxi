import Vue from 'vue'
//导入login
import login from '../view/login/index.vue'
//导入路由
import VueRouter from 'vue-router'
//注册路由
Vue.use(VueRouter)
//实例化
const router=new VueRouter({
    routes:[
      {
        path:'/login',
        component:login
      }
    ]
  })
//暴露出去
export default router