import Vue from 'vue'   //引入vue模块
import Router from 'vue-router' //引入路由


Vue.use(Router)

export default new Router({ //暴漏路由实例对象
  routes: [
      { 
        path:'/',
        redirect:'/login'
      },

      {path:'/login',
      component:() => import('./views/login/login.vue')},
      {
        path:'/home',
        component: () => import('./views/home/home.vue'),
        redirect:'/home/systeminfo'//重定向 一进home自动跳转到
        ,children:[
          {
            path:'/home/systeminfo', //系统信息
            component:() => import('./views/SystemInfo/SystemInfo.vue')
          },
          {
            path:'/home/accountmanage',//账号管理
            component:() => import('./views/AccountManage/AccountManage.vue')
          },
          {
            path:'/home/accountadd',//添加账号
            component:() => import('./views/AccountAdd/AccountAdd.vue')
          },
          {
            path:'/home/passwordmodify',//修改密码
            component:() => import('./views/PasswordModify/PasswordModify.vue')
          },
          {
            path:'/home/goodsmanage',//商品管理
            component:() => import('./views/GoodsManage/GoodsManage.vue')
          },
          {
            path:'/home/goodsadd',//添加商品
            component:() => import('./views/GoodsAdd/GoodsAdd.vue')
          },
          {
            path:'/home/selltotal',//销售统计
            component:() => import('./views/SellTotal/SellTotal.vue')
          },
          {
            path:'/home/stocktotal',//进货统计
            component: () => import('./views/StockTotal/StockTotal.vue')
          },
          {
            path:'/home/personal',
            component: ()=> import('./views/personal/personal.vue')
          }
         
        ]
      }

  ]
})
