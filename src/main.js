import Vue from 'vue'
import App from './App.vue'
//导入elmui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//注册elm
Vue.use(ElementUI);
//导入router
import router from './router/index'
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
