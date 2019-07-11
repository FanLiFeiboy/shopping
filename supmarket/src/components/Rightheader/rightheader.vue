<template>
    <div class="right-header">
            
            <el-row>
                
                <el-col :span="12">
                    <h3><i class="el-icon-s-grid"></i>永辉超市管理系统</h3>
                </el-col>

                <el-col :span="12">

                        <el-row>
                            <el-col :span='17'>
                                <!-- 下拉框 -->
                                    <el-dropdown @command='hanleCommand'>  
                                        <span class="el-dropdown-link">
                                            {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item command='person'>个人中心</el-dropdown-item>
                                            <el-dropdown-item command='logout'>账号注销</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                            </el-col>


                            <el-col :span='7'>
                                <!-- 头像 -->
                                <div class="head-portrait">
                                    <img :src="avatarUrl" alt=""> 
                                </div>
                            </el-col>
                        </el-row>

                </el-col>
            </el-row>
    </div>
</template>

<script>
 import {getUserinfo} from '@/api/account'

    export default {
        data(){
            return{
                username:'',
                avatarUrl:'',
            }
        },
        methods:{
            hanleCommand(command) {
                if(command === 'logout'){//退出系统
                //清除token
                window.localStorage.removeItem('lux_token')
                //弹出提示
                this.$message({
                    type:'success',
                    message:'退出成功'
                })
                //跳到登陆页面
                this.$router.push('/login')

                }else if(command === 'person'){//进入个人中心
                    this.$router.push('/home/personal')

                }
            },

            //拿去当前用户名
            getUserInfo(){
                    //发送请求 获取用户信息
                getUserinfo()
                .then(res =>{
                    //拿去后台数据
                    let {data}=res;
                    //渲染账户名
                    let {account,avatarUrl}=data[0]
                    this.username=account
                    this.avatarUrl='http://127.0.0.1:666'+avatarUrl

                })
                .catch(err => {
                    console.log(err)
                })
                


            }


        },
        created() {
        // 请求当前登录的用户信息
        this.getUserInfo();
    }
        
    }
</script>

<style lang='less'>
        .right-header{
            border-bottom: 2px solid  #ccc;
            &>.el-row{
                &>.el-col:first-child{
                    h3{
                        font-size: 20px;
                    }
                }
                &>.el-col:last-child{
                    &>.el-row{
                        &>.el-col:first-child{
                            text-align: right;
                        }  
                        &>.el-col:last-child{
                            //头像
                            .head-portrait{
                                width: 50px;
                                height: 50px;
                                background: yellow;
                                margin: 5px;
                                border-radius: 50%;
                                img{
                                    width: 100%;
                                    height: 100%;
                                    border-radius: 50%;
                                }
                            }


                        }



                    }

                }


            }
        }

</style>