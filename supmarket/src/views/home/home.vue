<template>
    <div class="home">
        <el-container>
            <!-- 左侧 -->
            <el-aside width="200px">
                <leftnav></leftnav>
            </el-aside>
            <el-container>
                <!-- 头部 -->
                <el-header>
                    <!-- 引入头部组件 -->
                    <rightheader ref="refss"></rightheader>
                </el-header>

                <el-main>
                    <!-- 路由出口 -->
                    <router-view @fn="fnn"></router-view>
                </el-main>

                <!-- 尾部 -->
                <el-footer>
                    <!-- 引入尾部组件 -->
                    <rightfooter></rightfooter>

                </el-footer>
            </el-container>
        </el-container>

    

    </div>
</template>

<script>
        //引入左侧导航栏模块
    import leftnav from '@/components/Leftnav/Leftnav.vue';
    import rightheader from '@/components/Rightheader/rightheader.vue';
    import rightfooter from '@/components/Rightfooter/rightfooter.vue';
    
    export default {
        methods:{
            fnn(){
               this.$refs.refss.getUserInfo() 
            }

        },



        components:{
            leftnav,//注册左侧导航栏
            rightheader,
            rightfooter,
        }   
    }
</script>

<style lang='less'>
    .home{
        height: 100%;
            .el-container{
                height: 100%;
                //左侧
            .el-aside {
                    background-color:rgb(48, 65, 86);
                    h2{
                        color: #fff;
                        text-indent: 30px;
                        margin: 10px 0px;
                    }
                    .el-menu{
                        border: none;
                    }
                }
            //上
            .el-header {
                
                line-height: 60px;
                
            }
            //中
            .el-main {
                    // background-color: #E9EEF3;
                    // line-height: 160px; 
                    }
            //下
            .el-footer {
                // background-color: #B3C0D1;
                line-height: 60px;
            }
        }

    }


     
  
  
  

  

  
 
  


</style>