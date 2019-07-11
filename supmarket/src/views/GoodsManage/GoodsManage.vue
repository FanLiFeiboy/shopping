<template>
    <div class="goods-manage">
         <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h2>账号管理</h2>
            </div>
            <!-- 搜索框 -->
            <div>
                <el-form :inline="true" :model="searchform" size='small'>
                    <el-form-item label="选择分类">
                        <el-select v-model="searchform.classify" placeholder="分类">
                        <el-option label="全部" value="全部"></el-option>
                        <el-option label="烟酒类" value="烟酒类"></el-option>
                        <el-option label="电子类" value="电子类"></el-option>
                        <el-option label="蔬菜类" value="蔬菜类"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="关键字:">
                        <el-input v-model="searchform.keyword" placeholder="关键字"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>

            </div>



            <!-- 表格 -->
            <div class="item">
                <el-table
                    ref="goodsTableData"
                    :data="goodsTableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    >
                    >

                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>

                    <el-table-column
                    label="分类"
                    prop="region"
                    >
                    </el-table-column>


                    <el-table-column
                    prop="goodsName"
                    label="商品名称"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="shapeCode"
                    label="条形码"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="purchasingPrice"
                    label="商品进价"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="marketPrice"
                    label="市场价"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="goodsPrice"
                    label="商品售价"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="goodsUnivalence"
                    label="商品单价"
                    >
                    </el-table-column>

                    
                    <el-table-column
                    label="时间"
                    prop="ctime"
                    >
                    <template slot-scope="scope">{{ scope.row.ctime | filterCtime}}</template>
                    </el-table-column>


                    <el-table-column
                    label="管理"
                    >
                     <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="goodsEdit(scope.row.id)"><i class="el-icon-setting"></i></el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="goodsDel(scope.row.id)"><i class="el-icon-delete"></i></el-button>
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
            <!-- <el-dialog title="修改表单" width="420px" :visible.sync="visible"> -->

                <!-- <el-form :model="editForm" style="width:316px" :rules="rules" ref="editForm">

                    <el-form-item label="账号名" label-width="120px" prop="account">
                    <el-input v-model="editForm.account" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="用户组" label-width="120px">
                    <el-select v-model="editForm.userGroup" placeholder="请选择活动区域">
                        <el-option label="普通用户" value="普通用户"></el-option>
                        <el-option label="高级用户" value="高级用户"></el-option>
                    </el-select>
                    </el-form-item>

                </el-form> -->
                
                <!-- 按钮 -->
                <!-- <div slot="footer" class="dialog-footer">
                    <el-button @click="visible = false">取 消</el-button>
                    <el-button type="primary" @click="visibleEdit()">确 定</el-button>
                </div> -->
                


            <!-- </el-dialog> -->




        </el-card>





    </div>
</template>

<script>
    //引入修改时间列表
    import moment from 'moment'
    import {goodsDel,searchform} from '@/api/goods'
    export default {
        data () {
           return{
               goodsTableData:[],
               pageSize:3,
               currentPage:1,
               total:10,
               searchform:{
                   classify:'',
                   keyword:'',
               }
           }
        },
        //钩子函数
        created(){
            //发送ajax到后台拿去数据
         this.getByPage()
        

        },

        methods:{

            
            //搜索查询
            onSubmit(){

                 this.getByPage()
                //搜集参数
                // let params={
                //     region:this.searchform.classify,
                //     keyword:this.searchform.keyword    
                // }
                // //发送ajax
                // searchform(params)
                // .then(res=>{
                //     let {data}=res
                //  this.goodsTableData=data;
                // console.log(res)
                   
                // })
                // .catch(err => {
                //     console.log(err)
                // })


            },



            //编辑
            goodsEdit(id){
                console.log(id)

            },
            //删除
            goodsDel(id){
                let params={
                    id
                }
                goodsDel(params)
                .then(res => {
                    let {code,reason} =res;
                    if(code === 0){
                        this.$message({
                            type:'success',
                            message:reason
                        })
                        this.getByPage()
                    }else if(code === 1){
                       this.$message.error(reason)          
                        }
                })
                .catch(err =>{
                    console.log(err)
                })
            },  

            //批量删除
            batchDel(){

            },

            //取消选择
            deselect(){

            },

            //当前条数
            handleSizeChange(pagesize){
                console.log('这是每页几条',pagesize)
                this.pageSize=pagesize
                this.getByPage()
            },

            //当前页
            handleCurrentChange(currentpage){
                console.log('这是当前页',currentpage)
                this.currentPage=currentpage
                this.getByPage()
            },

            //每页数据
            getByPage(){
                //传入当前页和每页几条
                let params={
                    pageSize:this.pageSize,
                    currentPage:this.currentPage,
                    region:this.searchform.classify,
                    keyword:this.searchform.keyword 
                }

            this.req.get('http://127.0.0.1:666/goods/getgoods',{params})
            .then(response =>{
                //拿去数据
                let {data,total}=response.data;
                //渲染到页面上
                this.goodsTableData=data;
                this.total=total;
                //优化
                if(!data.length && this.currentPage !== 1){
                    //当前页-1
                    this.currentPage-=1;
                    //自己在调用一次自己
                    this.getByPage()
                    }
                
            })
            .catch(err => {
                console.log(err)
            })
            }


        },

        filters:{
            filterCtime(ctime){
            return moment(ctime).format('YYYY-MM-DD')    

            }
        }

    }
</script>

<style lang='less'>

</style>