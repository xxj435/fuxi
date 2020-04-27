import Vue from 'vue'
import App from './App.vue'
//导入vuex
import store from '@/store/index.js'
//导入elmui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//注册elm
Vue.use(ElementUI);
//导入router
import router from './router/index'
new Vue({
  //挂载
  store,
  router,
  render: h => h(App),
}).$mount('#app')
