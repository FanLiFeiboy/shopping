<template>
    <div class="sell-total">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h1>销售统计</h1>
                
            </div>
            <div>
                <div id="sellCharts" style="height:400px;">
                    <!-- 放echarts 报表-->


                </div>
            </div>
        </el-card>




    </div>

</template>
    
<script>

    import {getSellData} from '@/api/goods'

    export default {
        data() {
            return{

                // x轴
                xData: ['19-06-20', '19-06-21', '19-06-22', '19-06-23', '19-06-24', '19-06-25', '19-06-26'],
                // 核心数据
                seriesData: [100, 1000, 901, 934, 200, 1330, 300]

            }
        },

        methods:{
            getData() {
                getSellData()
                    .then(res => {
                        // 接收数据
                        let {category, value} = res;
                        // 渲染
                        this.xData = category;
                        this.seriesData = value;

                        // 重新调用报表
                        var option = {
                            // x轴
                            xAxis: {
                                    type: 'category',
                                    data: this.xData
                            },
                            // y轴
                            yAxis: {
                                type: 'value',
                            },
                            // 核心数据
                            series: [{
                                data: this.seriesData,
                                type: 'line',
                            }]
                        }
                        this.drawCharts(option);
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },          





            drawCharts(option) {
                // 1. 初始化报表
                let sellChart = this.echarts.init( document.getElementById('sellCharts') )

                // 3. 使用配置生成报表
                sellChart.setOption( option )
            }
        },

        mounted(){
          let option = {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line'
                }]
            };
           this.drawCharts(option)
        }

    }
</script>

<style lang='less'>

</style>