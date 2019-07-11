<template>
    <div class="login">
            <!-- 这是登陆框 -->
        <div class="login-form">
            <h2 class="el-icon-s-custom">超市管理系统登陆</h2>
            <!--这是登陆验证 -->
            <el-form 
            :model="loginForm"
             status-icon 
             :rules="rules" 
             ref="loginForm" 
             label-width="100px" 
             class="demo-ruleForm">

                <el-form-item label="账号" prop="account">
                    <el-input type="text" v-model="loginForm.account" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="loginForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>

                
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
                
            </el-form>


        </div>
    </div>
</template>

<script>
    //引入正则表单验证函数  后缀名js可以不写
    import { pwdReg } from '@/utils/reg';
    import req from '@/utils/request'


    export default {

        data() {``
            //自定义函数验证
                //验证密码
            const checkPwd=(rule,value,callback) =>{
                //获取输入的值的长度用变量接受
                const len = value.length;
                if( value === '' ){
                    callback(new Error('密码不能为空'))
                }else if(len<3 || len>6){
                    callback(new Error('长度必须在3 ~ 6 位'))
                }else if(!pwdReg(value)){
                    callback(new Error('只可以输入字母和数字'))
                }
                else{
                    //确认密码不为空 触发一致性验证
                    if(this.loginForm.checkPass !=='') {
                        this.$refs.loginForm.validateField('checkPass')//触发确认密码一致性验证
                    }
                    callback()//成功
                }

            }
            const confirmPwd=(rule,value,callback) =>{
                if(value === ''){
                    callback(new Error('请再次输入密码'))//非空
                }else if(value !== this.loginForm.password){
                    callback(new Error ('两次密码输入不一致'))//密码不一致
                }else{
                    callback()  //成功
                }
            }

            return {
                
                loginForm:{
                     account: '',
                     password: '',
                    checkPass: '',
                },  
                
                rules:{
                    //内置验证规则 
                    //required: true 必填
                    //message:  提示信息
                    //trigger:  触发方式
                    //min:   最小
                    //max：  最大
                    //账号
                    account:[
                        {required:true,message:'请输入账号',trigger:'blur'},//空的时候触发
                        {min:3,max:5,message:'长度在3到5个字符',trigger:'blur'}//长度验证
                    ],
                    //密码
                    password:[
                        {required:true,validator:checkPwd,trigger:'blur'},//空的时候触发
                        
                    ],
                    //确认密码
                    checkPass:[
                        {required:true,validator:confirmPwd,trigger:'blur'}
                    ]
                },
            }
        },
        methods:{
              submitForm(formName) {
                  //获取el-form组件   验证所有填写的值符不符合规则 符合通过 返回值式true和false
                this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    //收集提交账号和密码
                    let params={
                        account:this.loginForm.account,
                        password:this.loginForm.password
                    }
                  
                    //发送ajax
                    req.post('/login/checklogin',params)
                    .then(res =>{
                        let {code,reason,token} =res;
                        if(code ===0 ){
                            window.localStorage.setItem('lux_token',token)

                            this.$message({
                                type:'success',
                                message:reason
                            })
                            this.$router.push('/home')
                        }else if(code === 1) {
                            this.$message.error(reason)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })

                } else {
                    console.log('前端验证不通过，不可以提交');
                    return false;
                }
                });
            },
            resetForm() {
                //重置按钮
                this.$refs.loginForm.resetFields();
            }
        }  
    }
</script>

<style lang="less">
    @import './login.less';
</style>