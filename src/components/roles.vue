<template>
  <div class="conten-roles">
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
        <el-table :data="rolesList" style="width: 100%" border >
          <!-- 展开的table -->
          <el-table-column type="expand">
            <!-- 模板 -->
            <template slot-scope="props">
              <!-- 生成 最左边的一级菜单 -->
              <el-row v-for="item in props.row.children" :key="item.id">
                <el-col :span="4">
                  <el-tag closable>{{item.authName}}</el-tag>
                  <!-- 小箭头 -->
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <!-- 二级菜单 需要单独占一行 用row嵌套即可 -->
                  <el-row v-for="level2  in item.children" :key="level2.id">
                    <el-col :span="4">
                      <el-tag closable type="success">{{level2.authName}}</el-tag>
                      <!-- 小箭头 -->
                      <i class="el-icon-arrow-right"></i>
                    </el-col>
                    <!-- 三级菜单 跟二级是平齐的 -->
                    <el-col :span="20">
                      <el-tag class="pad"
                        v-for="level3  in level2.children"
                        :key="level3.id"
                        closable
                        type="warning"
                      >{{level3.authName}}</el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <!-- 要么没有权限 -->
              <el-row v-if="props.row.children.length==0">
                <el-col :span="24">没有分配权限</el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column label="#" width="30" type="index" align="center"></el-table-column>
          <el-table-column prop="roleName" label="角色名称" width="180" align="center"></el-table-column>
          <el-table-column prop="roleDesc" label="角色描述" width="300" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" plain size="mini" icon="el-icon-edit"></el-button>
              <el-button type="danger" plain size="mini" icon="el-icon-delete"></el-button>
              <el-button type="warning" plain size="mini" icon="el-icon-check"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "users",
  data() {
    return {
      // 面包屑标题
      title1: "权限管理",
      title2: "角色列表",
      // 角色列表信息
      rolesList:[
        {id:1}
      ],
     
    };
  },
  methods: {
  
  },
 async created() {
      // 获取角色列表数据
  let res= await this.$axios.get('roles');
        console.log( res );
        this.rolesList = res.data.data;
  },
};
</script>
<style>
.pad{
  display:inline-block;
margin:0px 10px 10px 20px;
}
</style>
