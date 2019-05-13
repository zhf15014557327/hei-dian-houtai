<template>
  <div class="conten-orders">
    <!-- 面包屑导航 -->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <mianbaoxu :title1="title1" :title2="title2"></mianbaoxu>
        </div>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-row>
     <el-col :span="24">
        
             <el-table :data="ordersList" border style="width: 100%" >

            <el-table-column  type="index" label="#" width="50" align="center">
            </el-table-column>

            <el-table-column prop="order_number" label="订单编号" width="300" align="center">
            </el-table-column>

            <el-table-column prop="order_price" label="订单价格" width="120" align="center">
            </el-table-column>

            <el-table-column prop="pay_status" label="是否付款" width="100" align="center">
                <template slot-scope="scope">
                 
                  <el-button type="danger" size="mini" plain v-if="scope.row.pay_status == '0'">未付款</el-button>
                  <el-button type="success" size="mini" plain v-if="scope.row.pay_status == '1'">已付款</el-button>
                </template>

            </el-table-column>
            <el-table-column prop="is_send" label="是否发货" width="100" align="center">
            </el-table-column>

            <el-table-column prop="create_time" label="订单时间" width="200" align="center">
              <template slot-scope="scope">
                {{scope.row.create_time | beautifyTiem}}
              </template>

             </el-table-column>

            <el-table-column  label="操作" width="350" align="center">
               <template slot-scope="scope">
              <!-- 编辑 -->
               <el-button type="primary" icon="el-icon-edit" size="small" circle></el-button>

               </template>
            </el-table-column>
            </el-table>
      
      </el-col>
    </el-row>
    <!-- 分页 -->
       <el-row>
     <el-col :span="24">
       <div class="grid-content bg-purple">
           <el-pagination
              @size-change="pageSizeChange"
              @current-change="pageIndexChange"
              :current-page="tableData.pagenum"
              :page-sizes="[5, 10, 15,20]"
              :page-size="tableData.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
       </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "orders",
  data() {
    return {
      // 面包屑标题
      title1: "订单管理",
      title2: "订单列表",
      // 用户列表信息
     ordersList:[],
      // 表格信息
        tableData:{
       
          // 当前页码
          pagenum:1,
          // 页容量
          pagesize:10,
        } ,
        // 信息总条数
        total:10
    };
  },
  methods: {
    // 封装函数
    async getoRders(){
        let res = await this.$axios.get('orders',{params: this.tableData})
        console.log( res );
        this.pagenum = res.data.data.pagenum;
        this.total = res.data.data.total;
        this.ordersList = res.data.data.goods;
    },
    //  页容量事件
    pageSizeChange(size){
        //  console.log( size );
      this.tableData.pagesize = size;
      this.tableData.pagenum = 1;
       this.getoRders();
    },
    // 页码事件
    pageIndexChange(num){
        //  console.log( num );
        this.tableData.pagenum = num;
      this.getoRders();

    }
  },
  created() {
      // 获取用户列表数据
      this.getoRders();
  },
};
</script>
<style>
.search{
  background-color: #d3dce6;
}
</style>
