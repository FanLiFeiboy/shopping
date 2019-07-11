<template>
    <div class="goods-add">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h2>添加商品</h2>
            </div>
            <div class="item">
              <el-form 
                    :model="ruleGoods"
                    status-icon 
                    :rules="rules"
                    ref="ruleGoods"
                    label-width="100px"
                    >
                    <!-- 1 分类 -->
                    <el-form-item label="商品分类" prop="region">
                        <el-select v-model="ruleGoods.region" placeholder="--选择分类--">
                        <el-option label="烟酒类" value="烟酒类"></el-option>
                        <el-option label="电子类" value="电子类"></el-option>
                        <el-option label="蔬菜类" value="蔬菜类"></el-option>
                        </el-select>
                    </el-form-item>

                    <!-- 2条形码 -->
                    <el-form-item label="商品条形码" prop="shapeCode" >
                        <el-input type="text" style="width:300px" v-model="ruleGoods.shapeCode"></el-input>
                        <el-button type="primary" @click="create(100000000,999999999)">生成条形码</el-button>
                    </el-form-item>

                    <!-- 3商品名称 -->
                    <el-form-item label="商品名称" prop="goodsName" style="width:400px">
                        <el-input type="text" v-model="ruleGoods.goodsName"></el-input>
                    </el-form-item>

                    <!-- 4商品进价 -->
                    <el-form-item label="商品进价" prop="purchasingPrice">
                        <el-input @blur='goodsmultiple' v-model="ruleGoods.purchasingPrice" style="width:100px"></el-input>元 
                    </el-form-item>

                    <!-- 5 市场价 -->
                    <el-form-item label="市场价" prop="marketPrice" >
                        <el-input v-model="ruleGoods.marketPrice" style="width:100px"></el-input>元
                    </el-form-item>
                    <!-- 6商品售价 -->
                    <el-form-item label="商品售价" prop="goodsPrice">
                        <el-input v-model="ruleGoods.goodsPrice" style="width:100px"></el-input>元
                    </el-form-item>
                    
                    <!-- 7入库数量 -->
                    <el-form-item label="入库数量" prop="goodsNumber" style="width:300px">
                        <el-input v-model.number="ruleGoods.goodsNumber"></el-input>
                    </el-form-item>

                    <!-- 8商品重量 -->
                    <el-form-item label="商品重量" prop="goodsWeight" style="width:300px">
                        <el-input v-model="ruleGoods.goodsWeight"></el-input>
                    </el-form-item>
                    <!-- 9商品单价 -->
                    <el-form-item label="商品单价" prop="goodsUnivalence" style="width:300px">
                        <el-input v-model="ruleGoods.goodsUnivalence"></el-input>
                    </el-form-item>

                    <!-- 10单选框 -->
                     <el-form-item label="会员优惠" prop="discounts">
                        <el-radio-group v-model="ruleGoods.discounts">
                        <el-radio label="享受"></el-radio>
                        <el-radio label="不享受"></el-radio>
                        </el-radio-group>
                     </el-form-item>
                    <!-- 11 是否促销 -->
                     <el-form-item label="是否促销" prop="promotion">
                        <el-radio-group v-model="ruleGoods.promotion">
                        <el-radio label="启用"></el-radio>
                        <el-radio label="不启用"></el-radio>
                        </el-radio-group>
                     </el-form-item>
                     
                    <!-- 12 商品简介 -->
                    <el-form-item label="商品简介" prop="goodsdesc">
                        <el-input type="textarea" v-model="ruleGoods.goodsdesc"></el-input>
                    </el-form-item>
                    


                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleGoods')">提交</el-button>
                    </el-form-item>

              </el-form>



           </div>
        </el-card>
    </div>
</template>

<script>
    import {goodsadd} from '@/api/goods'
    export default {
        data() {
            return{
               
                ruleGoods:{
                    region:'', 
                    shapeCode:'',
                    goodsName:'',
                    goodsPrice:'',
                    marketPrice:'',
                    purchasingPrice:'',
                    goodsNumber:'',
                    goodsWeight:'',
                    goodsdesc:'',
                    discounts:'',
                    promotion:'',
                    goodsUnivalence:'',
                },
                //验证规则
                rules:{
                    region:[{
                        required:true,message:'请选择一项分类',trigger:'change'
                    }],

                    shapeCode:[{
                        required:true,message:'条形码不能为空',trigger:'blur'
                    }],

                    goodsName:[{
                        required:true,message:'请填写商品名',trigger:'blur'
                    }],
                    
                    goodsPrice:[{
                        required:true,message:'请输入价格',trigger:'blur'
                    }],

                    marketPrice:[{
                        required:true,message:'请输入价格',trigger:'blur'
                    }],

                    purchasingPrice:[{
                        required:true,message:'请输入价格',trigger:'blur'
                    }],

                    goodsNumber:[{
                        required:true,message:'请输入数量',trigger:'blur'
                    }],

                    goodsWeight:[{
                        required:true,message:'请输入数量',trigger:'blur'
                    }],
                    
                    discounts:[{required:true,message:'请填写至少一项',trigger:'change'}],
                    promotion:[{required:true,message:'请填写至少一项',trigger:'change'}],

                    goodsUnivalence:[{
                        required:true,message:'请输入商品单价',trigger:'blur'
                    }],
                    goodsdesc:[{
                        required:true,message:'请输入商品简介',trigger:'blur'
                    }],
                }
            }
        },
        
        methods:{
            //市场价和商品售价
            goodsmultiple (){
                this.ruleGoods.marketPrice=(parseFloat(this.ruleGoods.purchasingPrice)*1.5).toFixed(2)
                this.ruleGoods.goodsPrice=(parseFloat(this.ruleGoods.purchasingPrice)*2).toFixed(2)
            },
            create(max,min) {
                let num=Math.floor(Math.random()*(max-min+1)+min);
                this.ruleGoods.shapeCode=num;
            },
            submitForm(were){
                this.$refs.ruleGoods.validate((valid)=>{
                    if(valid){
                        //收集参数
                        let params={
                            region:this.ruleGoods.region, 
                            shapeCode:this.ruleGoods.shapeCode,
                            goodsName:this.ruleGoods.goodsName,
                            goodsPrice:this.ruleGoods.goodsPrice,
                            marketPrice:this.ruleGoods.marketPrice,
                            purchasingPrice:this.ruleGoods.purchasingPrice,
                            goodsNumber:this.ruleGoods.goodsNumber,
                            goodsWeight:this.ruleGoods.goodsWeight,
                            goodsdesc:this.ruleGoods.goodsdesc,
                            goodsUnivalence:this.ruleGoods.goodsUnivalence,
                        }
                         goodsadd(params)
                         .then(res =>{
                             let {code,reason} =res
                            if(code === 0){
                            this.$message({
                                type:'success',
                                message:reason
                            })
                            this.$router.push('/home/goodsmanage')
                            }else if(code === 1){
                                this.$message.error(reason)
                            }


                         })
                         .catch(err => {
                             console.log(err)
                         })    
                        
                    }else{
                        console.log('不能通过')
                        return false;
                    }
                })
            }
            
        }


        
    }
</script>

<style lang='less'>
        .goods-add{
            &>.el-card{
                .el-card__header{
                    background: #f1f1f1;
                }

                .el-card__body{

                }
             }

        }


</style>