<template>
  <div class="conten-categories">
    <!-- 面包屑导航 -->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <mianbaoxu :title1="title1" :title2="title2"></mianbaoxu>
        </div>
      </el-col>
    </el-row>
    <!-- 添加分类 -->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-button>添加分类</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-row>
      <el-col :span="24">
        <el-table :data="categoriesList" border style="width: 100%">
           <!-- 树形控件 -->
              <el-tree-grid
            prop="cat_name"
            label="分类名称"
            treeKey="cat_id"
            parentKey="cat_pid"
            levelKey="cat_level"
            childKey="children"
            :indentSize="30"
          ></el-tree-grid>
          <el-table-column prop="cat_level" label="级别" width="120" align="center">
                <template slot-scope="scope">
                    <span v-show="scope.row.cat_level=='0'"> 一级</span>
                    <span v-show="scope.row.cat_level=='1'"> 二级</span>
                    <span v-show="scope.row.cat_level=='2'"> 三级</span>
                </template>
          </el-table-column>

          <el-table-column prop="cat_deleted" label="是否有效" width="100" align="center">
                <template slot-scope="scope">
                    {{scope.row.cat_deleted?"无效":'有效'}}
                </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <!-- 编辑 -->
              <el-button type="primary" icon="el-icon-edit" size="small" circle></el-button>
              <!-- 删除 -->
              <el-button type="danger" icon="el-icon-delete" size="small" circle></el-button>
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
            :total="total"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ElTreeGrid from "element-tree-grid"
export default {
  name: "categories",
  components:{
        ElTreeGrid
  },
  data() {
    return {
      // 面包屑标题
      title1: "商品管理",
      title2: "商品分类",
      // 商品分类信息
      categoriesList: [],
      // 表格信息
      tableData: {
        // 查询参数
        query: "",
        // 当前页码
        pagenum: 1,
        // 页容量
        pagesize: 5
      },
      // 信息总条数
      total: 10,
      defaultProps:[]
    };
  },
  methods: {
    // 封装函数
    async getCategories() {
      let res = await this.$axios.get("categories", { params: this.tableData });
      console.log( res );
      this.pagenum = res.data.data.pagenum;
      this.total = res.data.data.total;
      this.categoriesList = res.data.data.result;
    },
    //  页容量事件
    pageSizeChange(size) {
      //  console.log( size );
      this.tableData.pagesize = size;
      this.tableData.pagenum = 1;
      this.getCategories();
    },
    // 页码事件
    pageIndexChange(num) {
      //  console.log( num );
      this.tableData.pagenum = num;
     this.getCategories();
    }
  },
  created() {
    // 获取用户列表数据
    this.getCategories();
  }
};
</script>
<style>
.search {
  background-color: #d3dce6;
}
</style>
