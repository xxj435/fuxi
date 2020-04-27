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
//导入接口
import {getInfo} from '@/api/index.js'
//导入token删除方法
import {remToken} from '@/utils/token.js'
//导入路由
import VueRouter from 'vue-router'
import { Message } from 'element-ui'
//导入vuex
import store from '@/store/index.js'
//注册路由
Vue.use(VueRouter)
//实例化
const router=new VueRouter({
    routes:[
      {
        path:'/login',
        component:login,
        meta:{title:'登录'}
      },
    //   路由重定向
      { path: "/", redirect:'/login' },
      {
          path:'/index',
          component:index,
          meta:{title:'首页'},
          children:[
            //   一般不加/
              {path:'user',component:user,meta:{title:'用户列表'}},
              {path:'shuju',component:shuju,meta:{title:'数据概况'}},
              {path:'qiye',component:qiye,meta:{title:'企业列表'}},
              {path:'xueke',component:xueke,meta:{title:'学科列表'}},
              {path:'tiku',component:tiku,meta:{title:'题库列表'}}
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
   if(to.path=='/login'){
       next()
   }else{
    getInfo().then(res=>{
        if(res.data.code==200){
            //代表token是对的.直接放行
        store.commit('changeUsername',res.data.data.username)
        store.commit('changeAvatar',res.data.data.avatar)
            next()
        }else{
            //弹出提示
            Message.error('登录状态异常,请重新登录')
            //删除本地token
            remToken()
            //打回登录页
            next('/login')
            //让进度条跑完
            NProgress.done()
        }
    })
   }
  })
  //跳转之后
  router.afterEach((to) => {
    // console.log(to)
    // console.log(from)
    //让进度条跑完
    NProgress.done()
    //把名字显示出来
    document.title=to.meta.title
  })
//暴露出去
export default router