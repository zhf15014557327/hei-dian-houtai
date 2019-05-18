<template>
  <div class="conten-goods">
    <!-- 面包屑导航 -->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <mianbaoxu :title1="title1" :title2="title2"></mianbaoxu>
        </div>
      </el-col>
    </el-row>
    <!-- 搜索框 -->
    <el-row  class="search">
        <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-input placeholder="请输入内容" v-model="tableData.query" >
            <template slot="append">
              <i class="el-icon-search" @click="goodsSearch"></i>
            </template>
          </el-input>
        </div>
      </el-col>
        <el-col :span="16">
        <div class="grid-content bg-purple">
           <el-button >添加商品</el-button>
          </el-input>
        </div>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-row>
     <el-col :span="24">
        
             <el-table :data="goodsList" border style="width: 100%" >

            <el-table-column  type="index" label="#" width="50" align="center">
            </el-table-column>

            <el-table-column prop="goods_name" label="商品名称" width="500" align="center">
            </el-table-column>

            <el-table-column prop="goods_price" label="商品价格(元)" width="120" align="center">
            </el-table-column>

            <el-table-column prop="goods_weight" label="商品重量" width="100" align="center">
            </el-table-column>

            <el-table-column prop="add_time" label="创建时间" width="200" align="center">
              <template slot-scope="scope">
                {{scope.row.add_time | beautifyTiem}}
              </template>

             </el-table-column>

            <el-table-column  label="操作" width="350" align="center">
               <template slot-scope="scope">
              <!-- 编辑 -->
               <el-button type="primary" icon="el-icon-edit" size="small" circle @click="intoBianji(scope.row)"></el-button>
               <!-- 删除 -->
                 <el-button type="danger" icon="el-icon-delete" size="small" circle @click="dleGoods(scope.row)"></el-button>
         
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
    <!-- 编辑框 -->
      <el-dialog title="编辑商品" :visible.sync="goodsVisible">
      <el-form :model="goodsdata" label-position="right" :rules="rules" ref="goodsinfo">
        <el-form-item label="商品名称" prop="attr_name" label-width="100px">
          <el-input v-model="goodsdata.attr_name" autocomplete="off" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="attr_vals" label-width="100px">
          <el-input v-model="goodsdata.attr_vals" autocomplete="off" placeholder="请输入商品价格"></el-input>
        </el-form-item>
        <el-form-item label="商品重量" prop="attr_vals" label-width="100px">
          <el-input v-model="goodsdata.attr_vals" autocomplete="off" placeholder="请输入商品重量"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="goodsVisible = false">取 消</el-button>
        <el-button type="primary" @click="goodsubmint('goodsinfo')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "goods",
  data() {
    return {
      // 面包屑标题
      title1: "商品管理",
      title2: "商品列表",
      // 用户列表信息
      goodsList:[],
      // 表格信息
        tableData:{
          // 查询参数
          query:"",
          // 当前页码
          pagenum:1,
          // 页容量
          pagesize:10,
        } ,
        // 信息总条数
        total:10,
        // 编辑框信息
        goodsdata:{},
        // 编辑框状态
        goodsVisible:false,
        // 验证规则
        rules:{

        }

    };
  },
  methods: {
    // 封装函数
    async getGoods(){
        let res = await this.$axios.get('goods',{params: this.tableData})
        // console.log( res );
        this.pagenum = res.data.data.pagenum;
        this.total = res.data.data.total;
        this.goodsList = res.data.data.goods;
    },

    //  页容量事件
    pageSizeChange(size){
        //  console.log( size );
      this.tableData.pagesize = size;
      this.tableData.pagenum = 1;
       this.getGoods();
    },

    // 页码事件
    pageIndexChange(num){
        //  console.log( num );
        this.tableData.pagenum = num;
      this.getGoods();
    },

  // 搜索商品
  goodsSearch(){
      this.getGoods();
  },

  // 删除商品
   dleGoods(data){
      // console.log( data );
        
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // 删除请求
             let res = await this.$axios.delete(`goods/${data.goods_id}`);
                // console.log( res );

          if (res.data.meta.status == 200) {
            this.$message({
              message: res.data.meta.msg,
              type: "success"
            });
               this.getGoods();
          } else {
            this.$message.error("删除失败");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
   },
   
  //  进入编辑商品
  intoBianji(goodsInof){
    console.log(goodsInof  );
  // 打开编辑框
  this.goodsVisible = true;


  },
  // 提交编辑数据
  postBianji(){

  }
  },

  created() {
      // 获取用户列表数据
      this.getGoods();
  },
};
</script>
<style>
.search{
  background-color: #d3dce6;
}
</style>
