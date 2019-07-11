import Vue from 'vue'   //引入vue模块  
import App from './App.vue'   //引入顶级组件app.vue
import router from './router' //引入路由

import './assets/css/reset.css'
import './assets/css/common.css'


import ElementUI from 'element-ui'; //引入element-ui 模块
import 'element-ui/lib/theme-chalk/index.css';  //引入element css样式

import axios from 'axios';  //引入axios
import qs from 'qs';    //引入qs
import echarts from 'echarts'

//挂载在原型上
Vue.prototype.req=axios;
Vue.prototype.qs=qs;
//报表
Vue.prototype.echarts=echarts;

Vue.use(ElementUI); //注册

//拦截路由
router.beforeEach((to,from,next) =>{
  const token = window.localStorage.getItem('lux_token')
  if(token){
    next()
  }else{
      
    if(to.path === '/login'){
      next()
    }else {
      next({path:'/login'})
    }




  }
})



Vue.config.productionTip = false  //阻止生产提示

new Vue({ //创建vue实例对象
  router,   //挂载路由
  render: h => h(App)   //挂载顶级组件 app.vue 
}).$mount('#app')     //挂载渲染dom
