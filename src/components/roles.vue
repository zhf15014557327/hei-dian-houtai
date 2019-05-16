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
           <el-button @click="addVisible = true">添加角色</el-button>
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
                  <el-tag closable @close="dletOneRoles(props.row,item)" >{{item.authName}}</el-tag>
                  <!-- 小箭头 -->
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <!-- 二级菜单 需要单独占一行 用row嵌套即可 -->
                  <el-row v-for="level2  in item.children" :key="level2.id">
                    <el-col :span="4">
                      <el-tag closable @close="dletOneRoles(props.row,level2)" type="success">{{level2.authName}}</el-tag>
                      <!-- 小箭头 -->
                      <i class="el-icon-arrow-right"></i>
                    </el-col>
                    <!-- 三级菜单 跟二级是平齐的 -->
                    <el-col :span="20">
                      <el-tag class="pad"
                        v-for="level3  in level2.children"
                        :key="level3.id"
                        closable @close="dletOneRoles(props.row,level3)"
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
          <el-table-column label="#" width="50" type="index" align="center"></el-table-column>
          <el-table-column prop="roleName" label="角色名称" width="180" align="center"></el-table-column>
          <el-table-column prop="roleDesc" label="角色描述" width="300" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" plain size="mini" icon="el-icon-edit" @click="edtRoles(scope.row.id)"></el-button>
              <el-button type="danger" plain size="mini" icon="el-icon-delete" @click="dletRoles(scope.row.id)"></el-button>
              <el-button type="warning" plain size="mini" icon="el-icon-check"  @click="Reads(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 角色框 -->
    <el-dialog title="添加角色" :visible.sync="addVisible">
      <el-form :model="rolesForm" label-position="right" :rules="rules" ref="rolesdata">
        <el-form-item label="角色名称"  prop="roleName" label-width="100px">
          <el-input v-model="rolesForm.roleName" autocomplete="off" placeholder="请输角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色描述"  prop="roleDesc" label-width="100px">
              <el-input v-model="rolesForm.roleDesc" autocomplete="off" placeholder="请输角色描述" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoles('rolesdata')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑角色框 -->
    <el-dialog title="编辑角色" :visible.sync="editVisible">
      <el-form :model="editRoles" label-position="right" :rules="rules" ref="editRoles">
        <el-form-item label="角色名称"  prop="roleName" label-width="100px">
          <el-input v-model="editRoles.roleName" autocomplete="off" placeholder="请输角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色描述"  prop="roleDesc" label-width="100px">
              <el-input v-model="editRoles.roleDesc" autocomplete="off" placeholder="请输角色描述" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="submintRoles('editRoles')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 权限分配框 -->
    <el-dialog title="权限分配" :visible.sync="ReadVisible">
        <el-row>
        <el-col :span="24">
              <el-tree
            :data="ReadRoles"
            show-checkbox
            node-key="id"
            default-expand-all
            :default-checked-keys="defaultKeys"
            :props="defaultProps"
            ref = "tree"
            >
          </el-tree>
          </el-input>
       
      </el-col>
    </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ReadVisible = false">取 消</el-button>
        <el-button type="primary" @click="submintCheckRoles">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "roles",
  data() {
    return {
      // 面包屑标题
      title1: "权限管理",
      title2: "角色列表",
      // 角色列表信息
      rolesList:[
        {id:1}
      ],
      // 角色框状态
      addVisible:false,
      // 添加角色数据
      rolesForm:{
        roleName:'',
        roleDesc:''
      },
      // 角色框状态
      editVisible:false,
      // 添加角色数据
      editRoles:{
        roleName:'',
        roleDesc:''
      },
      // 编辑权限框状态
      ReadVisible:false,
      // 添加权限数据
      ReadRoles:[],
      // 选中权限
      defaultKeys:[],
      // 起别名
        defaultProps: {
          label: 'authName',
        },
      // 正在编辑的对象信息
        rolesData:{},
      // 验证规则
        rules: {
          roleName: [
            { required: true, message: '请输入角色名', trigger: 'change' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
          ],
          roleDesc: [
            { required: true, message: '请输入角色描述', trigger: 'change' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'change' }
          ],
          }
     
    };
  },
  methods: {
    async getRoles(){
                  // 获取角色列表数据
        let res= await this.$axios.get('roles');
              // console.log( res );
              this.rolesList = res.data.data;
        },
    // 添加角色
   
   addRoles(formName){
      // 表单验证
        this.$refs[formName].validate( async (valid) => {
          if (valid) {
            // 验证成功 添加角色
            let res = await this.$axios.post('roles',this.rolesForm);
            // console.log( res );
            if(res.data.meta.status === 201 ){
              // 添加成功提示
                this.$message({
                    message: res.data.meta.msg,
                    type: 'success'
                  });
                // 关闭角色框
                this.addVisible = false;
                // 重新渲染页面
                this.getRoles()
            }else{
              // 添加角色失败
                this.$message.error(res.data.meta.msg);
            }
          } else {
            // 验证失败
             this.$message.error('表单数据错误');
            return false;
          }
        })
   },

    // 删除角色
    dletRoles(id){
           this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await this.$axios.delete(`roles/${id}`);
          // console.log( res ); 
          if(res.data.meta.status === 200 ){
              // 删除成功提示
                this.$message({
                    message: res.data.meta.msg,
                    type: 'success'
                  });
                // 重新渲染页面
                this.getRoles()
            }else{
              // 添加角色失败
                this.$message.error(res.data.meta.msg);
            }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },

    // 准备编辑角色
    async edtRoles(Id){
      this.editVisible = true;
      let res = await this.$axios.get(`roles/${Id}`);
      // console.log( res );
      this.editRoles = res.data.data
    },

    // 提交编辑角色
    submintRoles(formData){
        // 表单验证
        this.$refs[formData].validate( async (valid) => {
          if (valid) {
            // 验证成功 添加角色
            let res = await this.$axios.put(`roles/${this.editRoles.roleId}`,this.editRoles);
            console.log( res );
            if(res.data.meta.status == 200 ){
              // 添加成功提示
                this.$message({
                    message: res.data.meta.msg,
                    type: 'success'
                  });
                // 关闭角色框
                this.editVisible = false;
                // 重新渲染页面
                this.getRoles()
            }else{
              // 添加角色失败
                this.$message.error(res.data.meta.msg);
            }
          } else {
            // 验证失败
             this.$message.error('表单数据错误');
            return false;
          }
        })
    },

    // 显示权限分配框
    async Reads(data){
      this.rolesData = data;
      // console.log( data );
      // 打开权限分配框
      this.ReadVisible = true;
    
      let res = await this.$axios.get('rights/tree');
      // console.log( res );
      // 获取全限列表
      this.ReadRoles = res.data.data;
      // console.log(this.ReadRoles  );
      this.defaultKeys=[];
      // 使用递归的方法找儿子的id,添加到选中的数组中
      let findChild = (faed)=>{
            if(faed.children){
              // console.log( "有儿子" );
                faed.children.forEach(v => {
                  // this.defaultKeys.push(v.id);
                  // 树形控件的坑,设置选中父节点,子节点会全部被选中
                  findChild(v);
                })
            }else{
              // 找到没有儿子了,拿到最后一个儿子的id,
                this.defaultKeys.push(faed.id);
            }
      }
      // data是事件触发时传入的角色对象保存了拥有的权限,调用函数获取选中的id数组
      findChild(data)
      // console.log( this.defaultKeys );
    },

    // 提交权限分配框
    async submintCheckRoles(){
        // 编辑对象id
      let roleId = this.rolesData.id 
        // console.log(roleId  );
      //  获取选中id
      let checkId = this.$refs.tree.getCheckedKeys();
      //  console.log(checkId  );
      //  选中的父级id
      let checkfindId = this.$refs.tree.getHalfCheckedKeys();
      //  console.log( checkfindId   );  
      // 拼接数组
      let totalCheckId = checkId.concat(checkfindId);
      // console.log(totalCheckId  );
      // 转成字符串
      let rids = totalCheckId.join(',')
      //  console.log(rids);
      // 提交
      let res = await this.$axios.post(`roles/${roleId}/rights`,{rids})
            // console.log( res );
            if(res.data.meta.status == 200){
                this.$message({
                      message: res.data.meta.msg,
                      type: 'success'
                    });
              // 关闭编辑权限框
              this.ReadVisible = false;
              // 重新获取页面数据
              this.getRoles();
            }else{
                    this.$message.error(res.data.meta.msg);
            }
    },

    // 删除指定权限
    async dletOneRoles(roleId,rightId){
      let res = await this.$axios.delete(`roles/${roleId.id}/rights/${rightId.id}`);
      // console.log( res );
      // 避免页面的刷新,实现页面上的权限消失局部刷新
      roleId.children = res.data.data;

    }
  },
  created(){
        // 获取角色页面
      this.getRoles()
  }
};
</script>
<style>
.pad{
  display:inline-block;
margin:0px 10px 10px 20px;
}
</style>
