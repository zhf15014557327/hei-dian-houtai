<template>
  <div class="conten-rights">
       
    <!-- 面包屑导航 -->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <mianbaoxu :title1="title1" :title2="title2"></mianbaoxu>
        </div>
      </el-col>
    </el-row>
    <!-- 搜索框 -->
    <el-row>
        <el-col :span="24">
        <div class="grid-content bg-purple">
           <el-button >添加角色</el-button>
          </el-input>
        </div>
      </el-col>
    </el-row>
    <!-- 表格 -->
   <el-row>
      <el-col :span="24">
        <el-table :data="rightsList" style="width: 100%" border >
          <!-- 表格通过prop拿到属性 -->
          <el-table-column label="#" width="50" type="index" align="center"></el-table-column>
          <el-table-column prop="authName" label="权限名称" width="180" align="center"></el-table-column>
          <el-table-column prop="path" label="路径" width="300" align="center"></el-table-column>
          <el-table-column prop="level" label="层级" width="300" align="center">
            <!-- 通过slo-scope拿到表格属性处理数据 -->
             <template slot-scope="scope">
               <span v-show="scope.row.level === '0'">一级</span>
               <span v-show="scope.row.level ==='1'">二级</span>
               <span v-show="scope.row.level === '2'">三级</span>
              </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
     <!-- 返回顶内部 -->
  
  </div>
</template>
<script>
export default {
  name: "rights",
  data() {
    return {
      // 面包屑标题
      title1: "权限管理",
      title2: "权限列表",
      // 权限列表信息
      rightsList:[],
     
    };
  },
 
 async created() {
      // 获取角色列表数据
  let res= await this.$axios.get('rights/list');
        // console.log( res );
        this.rightsList = res.data.data;
  },
};
</script>
<style>
.pad{
  display:inline-block;
margin:0px 10px 10px 20px;
}
</style>
