import Vue from 'vue'
//导入进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
//导入login
import login from '../view/login/index.vue'
import index from '../view/index/index.vue'
//导入嵌套路由
import user from '../view/index/user/index.vue'
import shuju from '../view/index/shuju/index.vue'
import qiye from '../view/index/qiye/index.vue'
import tiku from '../view/index/tiku/index.vue'
import xueke from '../view/index/xueke/index.vue'
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
      },
      {
          path:'/index',
          component:index,
          children:[
            //   一般不加/
              {path:'user',component:user},
              {path:'shuju',component:shuju},
              {path:'qiye',component:qiye},
              {path:'xueke',component:xueke},
              {path:'tiku',component:tiku}
          ]
      }
    ]
  })
  //跳转之前
  router.beforeEach((to, from, next) => {
    // console.log(to)
    // console.log(from)
    // console.log(next)
    //如果一开始不是去login的话就跳转到login,如果是的话就去用户指定页
    //开启进度条
    NProgress.start()
   next()
  })
  //跳转之后
  router.afterEach((to, from) => {
    console.log(to)
    console.log(from)
    //让进度条跑完
    NProgress.done()
  })
//暴露出去
export default router