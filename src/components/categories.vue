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
          <el-button @click="SortVisible = true">添加分类</el-button>
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
              <span v-show="scope.row.cat_level=='0'">一级</span>
              <span v-show="scope.row.cat_level=='1'">二级</span>
              <span v-show="scope.row.cat_level=='2'">三级</span>
            </template>
          </el-table-column>

          <el-table-column prop="cat_deleted" label="是否有效" width="100" align="center">
            <template slot-scope="scope">{{scope.row.cat_deleted?"无效":'有效'}}</template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <!-- 编辑 -->
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="small"
                circle
                @click="editSort(scope.row)"
              ></el-button>
              <!-- 删除 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="small"
                circle
                @click="dltSort(scope.row)"
              ></el-button>
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
    <!-- 添加分类框 -->
    <el-dialog title="添加分类" :visible.sync="SortVisible">
      <el-form :model="Sortdata" label-position="right">
        <el-form-item label="分类名称" prop="cat_name" label-width="100px">
          <el-input v-model="Sortdata.cat_name" autocomplete="off" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="分类名称" label-width="100px">
          <!-- 级联选择器 -->
          <el-cascader
            :options="options"
            v-model="Sortdata.selectedOptions"
            placeholder="默认添加一级分类"
            expand-trigger="hover"
            :props="props"
          ></el-cascader>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="SortVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSortSubmint()">确 定</el-button>
      </div>
    </el-dialog>
    <!--分类编辑框 -->
    <el-dialog title="编辑分类" :visible.sync="editSortVisible">
      <el-form :model="editSortdata" label-position="right">
        <el-form-item label="分类名称" label-width="100px">
          <el-input v-model="editSortdata.cat_name" autocomplete="off" placeholder="请输入商品分类名称"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editSortVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSortSubmint()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ElTreeGrid from "element-tree-grid";
export default {
  name: "categories",
  components: {
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
      defaultProps: [],
      // 添加分类框状态
      SortVisible: false,
      // 分类数据
      Sortdata: {
        // 分类父 ID
        cat_pid: 0,
        // 分类名称
        cat_name: "",
        // 分类层级
        cat_level: 0,
        // 级联选择选中的id数组
        selectedOptions: []
      },
      // 级联选择器
      options: [],

      // 起别名
      props: {
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      // 分类编辑框状态
    editSortVisible:false,
    // 编辑数据
    editSortdata:{

      cat_name:'',
      cat_id:1,

    }
    };
  },
  methods: {
    // 封装函数
    async getCategories() {
      let res = await this.$axios.get("categories", { params: this.tableData });
      // console.log(res);
      this.pagenum = res.data.data.pagenum;
      this.total = res.data.data.total;
      // 插件级联选择器
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
    },

    // Element级联选择器父级信息
    async getfindlist() {
      let res = await this.$axios.get("/categories?type=2");
      //  console.log( res );
      if (res.data.meta.status === 200) {
        this.options = res.data.data;
      }
    },

    // 提交添加分类事件
    async addSortSubmint() {
      // 准备数据
      // 分类的层级
      let length = this.Sortdata.selectedOptions.length;
      this.Sortdata.cat_level = length;
      // 获取分类id
      switch (length) {
        case 0:
          this.Sortdata.cat_pid = 0;
          break;
        case 1:
          this.Sortdata.cat_pid = this.Sortdata.selectedOptions[0];
          break;
        case 2:
          this.Sortdata.cat_pid = this.Sortdata.selectedOptions[1];
          break;
        default:
          break;
      }
      // 数据准备完成发送请求
      let res = await this.$axios.post("categories", this.Sortdata);
      // console.log( res );
      if ((res.data.meta.status = 201)) {
        // 添加框
        this.SortVisible = false;
        // 重新渲染数据
        this.getCategories();
      }
    },

    // 删除商品分类
    dltSort(data) {
      console.log(data);
      this.$confirm("此操作将永久删除该商品分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // 删除请求
          let res = await this.$axios.delete(`categories/${data.cat_id}`);
          // console.log( res );

          if (res.data.meta.status == 200) {
            this.$message({
              message: res.data.meta.msg,
              type: "success"
            });
            this.getCategories();
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

    // 进入编辑商品分类框
    async editSort(data){
      // console.log( data );
      // 打开编辑框
        this.editSortVisible = true;
        let res = await this.$axios.get(`categories/${data.cat_id}`);
        console.log( res );
        if(res.data.meta.status == 200){
          this.editSortdata = res.data.data
        }
    },
    // 编辑商品分类
    async editSortSubmint(){
          let res = await this.$axios.put(`categories/${this.editSortdata.cat_id}`,{ cat_name: this.editSortdata.cat_name});
          // console.log( res );
          if(res.data.meta.status = 200){
                this.editSortVisible = false;
                 this.getCategories();
          }
    }
  },
  created() {
    // 获取分类列表数据
    this.getCategories();
  },
  mounted() {
    // 分类列表数据出现后才能获取级联菜单的数据
    this.getfindlist();
  }
};
</script>
<style>
.search {
  background-color: #d3dce6;
}
</style>
