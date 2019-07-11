<template>
    <div class="left-nav">
        <h2 class="el-icon-menu">超市管理系统</h2>
              <el-menu 
               :default-active="$route.path"
               class="el-menu-vertical-demo"
               background-color='rgb(48, 65, 86)'
               text-color="#fff"
               unique-opened
               router
               >
                    <el-submenu :index="(i+1)+'' " v-for="(nav,i) in leftnav" :key="i">
                        <template slot="title">
                        <i :class="nav.iconCls"></i>
                        <span>{{nav.navTitle}}</span>
                        </template>
                        
                        <el-menu-item
                         v-for='(subnav,i) in nav.children'
                         :key='i'
                         :index="subnav.path"
                         >
                        {{subnav.navSubtitle}}
                        </el-menu-item>
                    </el-submenu>

                    
                    
                </el-menu>  

    </div>
</template>

<script>
    import {getRole} from '@/api/account'

    export default {

        data () {
            return{
               leftnav:[] 
            }
        },
        created(){
            //发送请求
            getRole()
            .then(res => {
            let { role } = res;
            console.log(role)
            
            let nav=[
                   //导航栏1
                   {
                    iconCls:'el-icon-s-tools',
                    navTitle:'系统管理',
                    role:['高级用户','普通用户'],
                    children:[
                        {path:'/home/systeminfo',navSubtitle:'系统信息',}
                        ]
                   },
                   //导航栏2
                   {
                    iconCls:'el-icon-user-solid',
                    navTitle:'账号管理',
                    role:['高级用户'],
                    children:[
                        {path:'/home/accountmanage',navSubtitle:'账号管理',},
                        {path:'/home/accountadd',navSubtitle:'添加账号',},
                        {path:'/home/passwordmodify',navSubtitle:'密码修改',},
                        ]
                   },
                   //导航栏3
                   {
                    iconCls:'el-icon-s-goods',
                    navTitle:'商品管理',
                    role:['高级用户','普通用户'],
                    children:[
                        {path:'/home/goodsmanage',navSubtitle:'商品管理',},
                        {path:'/home/goodsadd',navSubtitle:'商品添加',},
                        ]
                   },
                   //导航栏4
                   {
                    iconCls:'el-icon-s-order',
                    navTitle:'统计管理',
                    role:['高级用户'],
                    children:[
                        {path:'/home/selltotal',navSubtitle:'销售统计',},
                        {path:'/home/stocktotal',navSubtitle:'进货统计',}
                        ]
                   },

                   //导航栏5
                   {
                    iconCls:'el-icon-s-num',
                    navTitle:'个人中心',
                    role:['高级用户'],
                    children:[
                        {path:'/home/personal',navSubtitle:'个人中心',},
                        ]
                   }
               ] 
            this.leftnav=nav.filter(v =>v.role.includes( role ))
           


            })
            .catch(err => {
                console.log(err)
            })
        }

        
    }
</script>

<style lang="less">
    .left-nav{
        height: 100%;

    }
</style>