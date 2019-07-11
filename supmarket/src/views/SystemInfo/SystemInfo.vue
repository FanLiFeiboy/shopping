<template>
    <div class="system-info">
        <!-- 卡片 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h2>系统信息</h2>
            </div>
                <!-- 身体信息 -->
            <div class="item">
                <!-- 警告条 -->
                 <el-alert
                        title="成功提示的文案"
                        type="success">
                    </el-alert>

                    <el-alert
                        title="消息提示的文案"
                        type="info">
                </el-alert>


                <!-- 栅格 -->
                <el-row :gutter="30">
                    <el-col :span='12'>
                        <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <h2>销售排行</h2>
                                </div>
                                <div class="text item">
                                   <!-- 左表格 -->
                                        <el-table
                                            :data="saleRank"
                                            stripe
                                            style="width: 100%">

                                            <el-table-column
                                            prop="goodsName"
                                            label="商品名称"
                                            >
                                            </el-table-column>

                                            <el-table-column
                                            prop="salesNum"
                                            label="销量"
                                           >
                                            </el-table-column>

                                            
                                        </el-table>

                                </div>
                        </el-card>


                    </el-col>

                    <el-col :span='12'>
                        <!-- 右侧 -->
                        <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <h2>缺货商品</h2>
                                </div>
                                <div class="text item">
                                   <!-- 左表格 -->
                                        <el-table
                                            :data="stockoutTable"
                                            stripe
                                            style="width: 100%">

                                            <el-table-column
                                            prop="goodsName"
                                            label="商品名称"
                                            >
                                            </el-table-column>

                                            <el-table-column
                                            prop="salesNum"
                                            label="库存"
                                           > 
                                            </el-table-column>

                                           <el-table-column
                                            prop="inventory"
                                            label="操作">
                                            </el-table-column>

                                        </el-table>

                                </div>
                        </el-card>


                    </el-col>
                </el-row>
                
            </div>
        </el-card>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                    //左侧数据
                    saleRank: [
                        {
                        goodsName: '霸王洗发水',
                        salesNum: 100, 
                    },
                       {
                        goodsName: '霸王洗发水',
                        salesNum: 100, 
                    },
                       {
                        goodsName: '霸王洗发水',
                        salesNum: 100, 
                    }],
                    stockoutTable:[
                        {
                        goodsName:'霸王',
                        salesNum:200,
                        inventory:'入库'
                        }
                    ]

            }
        }
        
    }
</script>

<style lang='less'>
        .system-info{
            &>.el-card{
                .el-card__header{
                    background: #f1f1f1;
                }

                .el-card__body{
                    .item{
                        .el-alert:nth-child(2){
                            margin: 20px 0px;
                        }
                  }

               }

            }
        }



</style>