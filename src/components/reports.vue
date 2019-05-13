<template>
  <div class="conten-reports">
    <!-- 面包屑导航 -->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <mianbaoxu :title1="title1" :title2="title2"></mianbaoxu>
        </div>
      </el-col>
    </el-row>
    <!-- 数据图型化 -->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-card shadow="always">
              <div ref="echarts" style="width:850px;height:550px;" id="main" >

              </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// 导入echarts
import echarts from "echarts";
export default {
  name: "reports",
  data() {
    return {
      // 面包屑标题
      title1: "数据报表",
      title2: "数据统计",
      //   统计图数据
      option : {
    title: {
        text: '用户来源'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['周一','周二','周三','周四','周五','周六','周日']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'邮件营销',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'联盟广告',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
            name:'视频广告',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
            name:'直接访问',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
            name:'搜索引擎',
            type:'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {normal: {}},
            data:[820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
    },
    };
  },
  async mounted() {
    var myChart = echarts.init(this.$refs.echarts);
    console.log(  myChart);
        let res = await this.$axios.get("reports/type/1");
    // console.log(res);
    this.option = res.data.data;
    //  console.log( this.option );
    // 指定图表的配置项和数据
  
    this.option.xAxis[0].boundaryGap = false; 
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(this.option);
  }
};
</script>
<style>
.search {
  background-color: #d3dce6;
}
</style>
