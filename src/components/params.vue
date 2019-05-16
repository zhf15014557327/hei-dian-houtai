<template>
  <div class="conten-params">
    <!-- 面包屑导航 -->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <mianbaoxu :title1="title1" :title2="title2"></mianbaoxu>
        </div>
      </el-col>
    </el-row>
    <!-- 提示 -->
    <el-row>
      <el-col :span="24" class="padding">
        <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon></el-alert>
      </el-col>
    </el-row>
    <!-- 联级菜单 -->
    <el-row>
      <el-col :span="24">
        <span class="cascader">请选择商品分类:</span>
        <el-cascader
          expand-trigger="hover"
          :options="options"
         
          @change="handleChange"
          :props="props"
          :show-all-levels="false"
        ></el-cascader>
      </el-col>
    </el-row>
    <!-- tob栏 -->
    <el-row class="padding">
      <el-col :span="24">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="动态参数" name="first">
            <el-row>
              <el-col :span="24">
                <!-- 添加动态参数按钮 -->
                <el-button type="success">添加动态参数</el-button>
              </el-col>
            </el-row>
            <!-- 表格 -->
            <el-row class="padding">
              <el-col :span="24">
                <el-table :data="tableData" border style="width: 100%">
                  <el-table-column  width="50"></el-table-column>
                  <el-table-column type="index" width="50"></el-table-column>
                  <el-table-column prop="date" label="商品参数" width="200"></el-table-column>
                  <el-table-column prop="name" label="操作" width="200">
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
          </el-tab-pane>
          <el-tab-pane label="静态参数" name="second">
            <el-row>
              <el-col :span="24">
                <!-- 添加静态参数按钮 -->
                <el-button type="success">添加静态参数</el-button>
              </el-col>
            </el-row>
            <!-- 表格 -->
            <el-row class="padding">
              <el-col :span="24">
                <el-table :data="tableData" border style="width: 100%">
                  <el-table-column type="index" width="50"></el-table-column>
                  <el-table-column prop="date" label="属性名" width="200" align="center"></el-table-column>
                  <el-table-column prop="date" label="属性值" width="200" align="center"></el-table-column>
                  <el-table-column prop="name" label="操作" width="200" align="center">
                    <template slot-scope="scope" width="300">
                      <!-- 编辑 -->
                      <el-button type="primary" icon="el-icon-edit" size="small" circle></el-button>
                      <!-- 删除 -->
                      <el-button type="danger" icon="el-icon-delete" size="small" circle></el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "params",
  data() {
    return {
      // 面包屑标题
      title1: "商品管理",
      title2: "分类参数",
      // 用户列表信息
      userList: [],
      // 级联单数据
      options: [],
      // 起别名
      props: {
          value: 'cat_id',
          label: 'cat_name'
        },
        // tob栏选中状态
        activeName:'first',
    };
  },
  methods: {
    // 封装函数
    handleChange(){

    }
   
  },
  async created() {
    // 获取用户列表数据
     let res = await this.$axios.get("categories?type=3");
     console.log( res ); 
     this.options = res.data.data;
  }
};
</script>
<style>
.padding {
  margin: 20px 0;
}
.cascader {
  margin-right: 20px;
}
</style>
