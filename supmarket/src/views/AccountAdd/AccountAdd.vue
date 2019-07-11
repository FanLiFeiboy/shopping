<template>
    <div class="account-add">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <h2>添加管理员账号</h2>
                </div>
                <div class="item">
                    <el-form 
                    :model="accountAdd" 
                    status-icon 
                    :rules="rules" 
                    ref="accountAdd" 
                    label-width="100px" 
                    class="demo-ruleForm"
                    style="width:400px;"
                    >

                        <el-form-item label="账号" prop="account">
                            <el-input type="text" v-model="accountAdd.account" autocomplete="off"></el-input>
                        </el-form-item>
                        
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="accountAdd.password" autocomplete="off"></el-input>
                        </el-form-item>


                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input type="password" v-model="accountAdd.checkPass" autocomplete="off"></el-input>
                        </el-form-item>

                        <!-- 下拉框 -->
                        <el-form-item label="选择用户组" prop="userGroup">
                                <el-select v-model="accountAdd.userGroup" placeholder="请选择用户组">
                                <el-option label="高级用户" value="高级用户"></el-option>
                                <el-option label="普通用户" value="普通用户"></el-option>
                                </el-select>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm('accountAdd')">提交</el-button>
                            <el-button @click="resetForm('accountAdd')">重置</el-button>
                        </el-form-item>
                    </el-form>
                 </div>
            </el-card>
    </div>
</template>

<script>

   import {pwdReg} from '@/utils/reg'

   import {accountadd} from '@/api/account'



    export default {
        data() {
            const checkPwd=(rule,value,callback)=>{
                const len =value.length;
                if(value === ''){
                    callback(new Error('密码不能为空'))
                }else if(len < 3 || len >6){
                    callback(new Error('密码必须在3~6位'))
                }else{
                    //确认密码不为空的时候
                    if(this.accountAdd.checkPass !== '') {
                        this.$refs.accountAdd.validateField('checkPass')
                    }
                    callback()
                }
            }

            const confirmPwd=(rule,value,callback) =>{
                if(value === ''){
                    callback(new Error('请在此输入密码'))
                }else if(value !== this.accountAdd.password){
                    callback(new Error('两次密码输入不一致'))
                }else{
                    callback()
                }

            }


            return {
                accountAdd:{
                    account:'',
                    password:'',
                    checkPass:'',
                    userGroup:''
                },

                //验证规则
                rules:{
                    account:[
                        {required:true,message:'账号不能为空',trigger:'blur'}, //非空验证
                        {min:3,max:6,message:'账号必须在3~6位',trigger:'blur'}
                    ],
                    password:[
                        {required:true,validator:checkPwd,trigger:'blur'}//自定义验证
                        ],

                    checkPass:[
                        {required:true,validator:confirmPwd,trigger:'blur'} //自定义验证
                        ],
                        //下拉框
                    userGroup:[
                        {required:true,message:'用户组不能为空',trigger:'change'}
                    ]
                }
            }


        },
        methods:{
            //提交按钮事件
            submitForm(forName){
                //如果全部表单填写符不符合验证  valid 返回值式 true和false
                this.$refs.accountAdd.validate((valid) =>{
                    if(valid){
                       let params={
                            account:this.accountAdd.account,
                            password:this.accountAdd.password,
                            userGroup:this.accountAdd.userGroup
                        }
                        //发送ajax
                        accountadd(params)
                        .then(res =>{
                            let {code,reason}=res;
                            //判断
                            if(code === 0){
                                //弹成功提示
                                this.$message({
                                    message:reason,
                                    type: 'success'
                                    });
                                //跳转到
                                this.$router.push('/home/accountmanage')
                            }else if(code === 1){
                                //谈失败提示
                                 this.$message.error(reason);
                            }
                        })
                        .catch(err =>{
                            console.log(err)
                        })    
                        


                    }else{
                        console.log('前端验证不通过不能提交')
                        return false;
                    }

                })
            },
            //重置按钮
            resetForm () {
                this.$refs.accountAdd.resetFields();
            }




        }
        
    }
</script>

<style lang='less'>
        .account-add{
             &>.el-card{
                .el-card__header{
                    background: #f1f1f1;
                }

                .el-card__body{

                }
             }
        }
</style>