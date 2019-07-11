<template>
    <div class="account-manage">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h2>账号管理</h2>
            </div>
            <!-- 表格 -->
            <div class="item">
                <el-table
                    ref="accountTableData"
                    :data="accountTableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                     @selection-change="selectChange">
                    >

                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>

                    <el-table-column
                    label="用户名称"
                    prop="account"
                    >
                   
                    </el-table-column>

                    <el-table-column
                    prop="userGroup"
                    label="用户组"
                    >
                    </el-table-column>

                    
                    <el-table-column
                    label="时间"
                    prop="ctime"
                    >
                    <template slot-scope="scope">{{ scope.row.ctime | filterCtime }}</template>
                    </el-table-column>


                    <el-table-column
                    label="管理"
                    >
                     <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.row.id)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                 </el-table>


            </div>

            <el-row style="margin-top:20px;">
            <el-button @click="batchDel" type="danger" size='small'>批量删除</el-button>
            <el-button  @click="deselect()" type="primary" size='small'>取消选择</el-button>
            </el-row>   
            

            <!-- 分页 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[1, 3, 15, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                style="margin-top:20px;"
                >
            </el-pagination>
            

            <!-- 修改模态框 -->
            <el-dialog title="修改表单" width="420px" :visible.sync="visible">

                <el-form :model="editForm" style="width:316px" :rules="rules" ref="editForm">

                    <el-form-item label="账号名" label-width="120px" prop="account">
                    <el-input v-model="editForm.account" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="用户组" label-width="120px">
                    <el-select v-model="editForm.userGroup" placeholder="请选择活动区域">
                        <el-option label="普通用户" value="普通用户"></el-option>
                        <el-option label="高级用户" value="高级用户"></el-option>
                    </el-select>
                    </el-form-item>

                </el-form>
                
                <!-- 按钮 -->
                <div slot="footer" class="dialog-footer">
                    <el-button @click="visible = false">取 消</el-button>
                    <el-button type="primary" @click="visibleEdit()">确 定</el-button>
                </div>
                


            </el-dialog>




        </el-card>


    </div>
</template>

<script>
    import moment from 'moment'
    import {batchdelete,accountedit,saveaccount,accountdel,accountlistByPage} from '@/api/account'
    
    export default {
        data() {
            return{
                accountTableData:[],
                currentPage:1,
                pageSize:3,
                visible:false,
                editForm:{ //修改表单
                    account:'',
                    userGroup:'',
                },
                idEdit:'',
                //批量删除取id
                delIdArr:[],
                total:0,
                //表单验证规则
                rules:{
                    account:[
                        {required:true,message:'账号不能为空',trigger:'blur'},
                        {min:3,max:6,message:'账号长度必须在3~6位之间',trigger:'blur'}
                    ],
                    userGroup:[]
                }
                


            }
        },
        methods:{
                //批量删除
                batchDel() {
                 this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    })
                    .then(() => {
                    //发送ajax
                    let params={idArr:this.delIdArr}
                    batchdelete(params)
                    .then(res => {
                        let {code ,reason } =res
                        if(code === 0 ){
                            this.$message({
                                type:'success',
                                message:reason
                            })
                            //跟新数据
                            this.getAccountsByPage();
                        }else if(code === 1){
                            this.$message.error(reason)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })



                    })
                    .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                    });
                
                },

                //取消选择
                deselect(){
                    this.$refs.accountTableData.clearSelection();
                },

                //选中的状态发生改变是
                selectChange(num){
                    this.delIdArr=num.map(v => v.id)  //循环选中的数据 把每一项的id取出来 放入一个全新的数组
                    console.log(this.delIdArr)
                },


                //编辑
                handleEdit(id){
                    this.visible=true;
                   //把id保存到
                    this.idEdit=id;

                    accountedit({id})
                    .then(res =>{
                        let {account,userGroup} =res.data[0]
                        this.editForm.account=account;
                        this.editForm.userGroup=userGroup;
                    })
                    .catch(err => {
                        console.log(err)
                    })
                },

                //修改
                visibleEdit(id){
                    //把id赋值给
                   id=this.idEdit
                   //点击确定的时候模态框消失
                   
                    //前端验证全部通过的时候
                    this.$refs.editForm.validate((valid) => {
                        if(valid){
                          //获取参数
                          this.visible=false;
                           let params={
                              id:this.idEdit,
                              account:this.editForm.account,
                              userGroup:this.editForm.userGroup
                          }
                          
                          //发送ajax
                         saveaccount(params)
                          .then(res =>{
                              
                              let {code,reason} = res;
                              if(code === 0) {
                                  this.$message({
                                      type:'success',
                                      message:reason
                                  })
                                  this.getAccountsByPage();
                              }else if(code === 1){
                                  this.$message.error(reason)
                              }

                          })
                          .catch(err =>{
                              console.log(err)
                          })
                          


                        
                        }else{
                              
                        }
                    })


                },

                //删除
                handleDelete(id) {
                     this.$confirm('你确定要删除?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        })
                    .then(() => { //确定
                         console.log('删除',id)
                    //发送ajax
                    accountdel({id})
                    .then(res =>{
                        //接受后台相应数据
                        let {code,reason} =res;
                        if(code === 0){
                            this.$message({
                                type:'success',
                                message:reason,
                            })
                            this.getAccountsByPage();
                            
                        }else if(code === 1){
                            this.$message.error(reason)
                        }

                    })
                    .catch(err =>{
                        console.log(err)
                    })

                    })
                    //取消
                    .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                    })


                    
                   

                },

                //分页
                //每页条数
                handleSizeChange(pageSize){
                    this.pageSize=pageSize;
                     this.getAccountsByPage()
                },

                //当前页面
                handleCurrentChange(currentPage){
                    this.currentPage=currentPage;
                     this.getAccountsByPage()
                },

                //分页跟新每页数据
                 getAccountsByPage(){
                     let params={
                         pageSize:this.pageSize,
                        currentPage:this.currentPage

                     }

                    accountlistByPage(params)
                    .then(res => {
                        let {total,data} =res;
                         this.total=total;
                        this.accountTableData=data;

                        if(!data.length && this.currentPage !== 1){
                            this.currentPage-=1;
                            this.getAccountsByPage()
                        }
                        

                    })
                    .catch(err =>{
                        console.log(err)
                    })  


                 },

         

         },

        //钩子函数
        created(){
                
                this.getAccountsByPage()
            },


            
        filters:{
            filterCtime(ctime){
                return moment(ctime).format('YYYY-MM-DD hh:mm:ss')
            }
        }
        
    }
</script>

<style lang='less'>
        .account-manage{
                 &>.el-card{
                .el-card__header{
                    background: #f1f1f1;
                }

                .el-card__body{

                }
             }
        }
</style>