<template>
    <div class="password-modify">   
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <h2>修改账号密码</h2>
                </div>
                <div class="item">

                    <el-form 
                    :model="changePassword" 
                    status-icon 
                    :rules="rules" 
                    ref="changePassword" 
                    label-width="100px" 
                    style="width:400px;"
                    >
                        <el-form-item label="原密码" prop="oldPassword">
                            <el-input type="text" v-model="changePassword.oldPassword" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="新密码" prop="newPassword">
                            <el-input type="text" v-model="changePassword.newPassword" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input v-model="changePassword.checkPass" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>

                            <el-button type="primary" @click="submitForm('changePassword')">修改</el-button>
                           
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
    </div>
</template>

<script>
  //引入 正则表达式
    import {pwdReg} from '@/utils/reg'
    import {passwordModify,checkoldPass} from '@/api/account'

    export default {

        data(){
         
         //验证原密码是否和账号相同
        const checkoldPwd=(rule,value,callback) => {
            if(value === ''){
                callback(new Error ('密码不能位空'))
            }else{
                //发送ajax
                checkoldPass({oldpass:value})
                .then(res =>{
                    let {code,reason}=res
                    if(code === 0){
                        callback()  //成功
                    }else if(code === 1){
                        callback(reason) //错误返回提示
                    }
                })
                .catch(err =>{
                    console.log(err)
                })
            }
        }

        const checkPwd=(rule,value,callback) =>{
                let len=value.length;
            if(value === ''){
                callback(new Error('请输入新密码'))
            }else if(value === this.changePassword.oldPassword){
                callback(new Error('新密码不能与旧密码相同'))
            }
            else if(len < 3 || len > 6 ){
                callback(new Error('密码必须在3~6位'))
            }else if(!pwdReg(value)){
                callback(new Error('只可以输入数字和字母'))
            }else{
                //当确认密码不为空的时候
                if(this.changePassword.checkPass !== ''){

                    this.$refs.changePassword.validateField('checkPass') //跟checkPass 反复验证
                }
                callback()
            }
        }
        //确认密码
        const confirmPwd =(rule,value,callback) => {
            if(value === ''){
                callback(new Error('请输入确认密码'))
            }else if(value !== this.changePassword.newPassword){
                callback(new Error('sada'))
            }else{
                callback()
            }

        }



            return {
                changePassword:{
                    //原密码
                    oldPassword:'',
                    //新密码
                    newPassword:'',
                    //确认密码
                    checkPass:'',
                    },
                
                rules:{
                    oldPassword:[
                        {required:true,validator:checkoldPwd,trigger:'blur'}
                    ],
                    newPassword:[{
                        required:true,validator:checkPwd,trigger:'blur'
                    }],
                    checkPass:[{
                        required:true,validator:confirmPwd,trigger:'blur'
                    }]
                }
                    



            }
                 
                
               
            

        },
        methods:{
            submitForm(were){
                this.$refs.changePassword.validate((valid) => {
                    if(valid){
                    //收集参数
                    let params={
                        newpassord:this. changePassword.newPassword
                    }
                    //修改密码
                    passwordModify(params)
                    .then(res => {
                        //接到后台给的数据
                        let {code,reason}=res
                        if(code === 0){
                            this.$message({
                                type:'success',
                                message:reason
                            })
                            //清除token
                            window.localStorage.removeItem('lux_token')
                            //跳转页面
                            this.$router.push('/login')
                        }else if(code === 1){
                            this.$message.error(reason)
                        }

                    })
                    .catch(err => {
                        console.log(err)
                    })

                    }else{
                        console.log('不可以修改')
                    }
                })
            }
        }



    }
</script>

<style lang='less'>
        .password-modify{
             &>.el-card{
                .el-card__header{
                    background: #f1f1f1;
                }

                .el-card__body{

                }
             }
        }
</style>