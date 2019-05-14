<template>
  <div class="conten-users">
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
          <el-input placeholder="请输入内容" v-model="tableData.query">
            <template slot="append">
              <i class="el-icon-search" @click="searchUser"></i>
            </template>
          </el-input>
        </div>
      </el-col>
        <el-col :span="16">
        <div class="grid-content bg-purple">
           <el-button  @click="visible = true">添加用户</el-button>
          </el-input>
        </div>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-row>
     <el-col :span="24">
        
             <el-table :data="userList" border style="width: 100%">
            <el-table-column  type="index" label="#" width="50" align="center">
            </el-table-column>
            <el-table-column prop="username" label="姓名" width="180" align="center">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="330" align="center">
            </el-table-column>
            <el-table-column prop="mobile" label="电话" width="330" align="center">
            </el-table-column>
            <el-table-column prop="mg_state" label="用户状态" width="80" align="center">
              <!-- 开关 -->
              <template slot-scope="scope">
                  <el-switch
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="statusChange(scope.row)"
                >
              </el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="eminl" label="操作" width="350" align="center">
               <template slot-scope="scope">
              <!-- 编辑 -->
               <el-button type="primary" icon="el-icon-edit" size="small" circle @click="bianJi(scope.row.id)"></el-button>
               <!-- 删除 -->
                 <el-button type="danger" icon="el-icon-delete" size="small" circle  @click ="dlt(scope.row.id)"></el-button>
                 <!-- 选中 -->
                <el-button type="success" icon="el-icon-check" size="small" circle  @click="rols(scope.row)"></el-button>
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
      <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="visible" >
        <el-form :model="form" label-position= 'left'  label-width="80px" :rules="rules" ref="userForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submit('userForm')">确 定</el-button>
      </div>
    </el-dialog>
      <!-- 编辑用户对话框 -->
    <el-dialog title="修改用户" :visible.sync="updetVisible" >
        <el-form :model="updetform" label-position= 'left'  label-width="80px" :rules="rules" ref="updetForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="updetform.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="updetform.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
            <el-input v-model="updetform.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updetVisible = false">取 消</el-button>
        <el-button type="primary" @click="updetSubmit('updetForm')">确 定</el-button>
      </div>
  </el-dialog>
  <!-- 权限对话框 -->
    <el-dialog title="分配角色" :visible.sync="rolsVisible" >
        <el-form  label-position= 'left'  label-width="100px">
        <el-form-item label="用户名" >
          <span>{{slectedData.username}}</span>
        </el-form-item>
       
        <el-form-item label="请选择角色"  label-width="90px">
            <el-select  v-model="slectedData.role_name"  placeholder="请选择">
              <el-option
                  v-for="item in roles"
                  :key="item.id"
                  :label="item.roleName"
                  :value="item.id">
              </el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rolsVisible = false">取 消</el-button>
        <el-button type="primary" @click="rolsSubmit">确 定</el-button>
      </div>
  </el-dialog>
  </div>
</template>
<script>
export default {
  name: "users",
  
  data() {
    // 自定义表单验证方法
     let  validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱号"));
      } else { 
           //自定义使用正则
        let reg =/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

        if (reg.test(value) == true) {
          callback();
        } else {
          callback(new Error("请输入正确邮箱号"));
        }
      }
    };
     let validateMobile = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {    
           //自定义使用正则
        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;

        if (reg.test(value) == true) {
          callback();
        } else {
          callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      // 面包屑标题
      title1: "用户管理",
      title2: "用户列表",
      // 用户列表信息
      userList:[],
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
        // 对话框状态
        visible:false,
        // 对话框信息
        form:{
          username:'',
          password:'',
          email:'',
          mobile:"",
        },
        // 验证规则
        rules:{
            username: [
            { required: true, message: '请输入用户名', trigger: 'change' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change' }
          ],
            password: [
            { required: true, message: '请输入密码', trigger: 'change' },
            { min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'change' }
          ],
          // 使用自定义规则
           email: [ { validator: validateEmail, trigger: 'change' }],
           mobile: [{ validator: validateMobile, trigger: 'change' }],
        },
        // 编辑对话框状态
        updetVisible:false,
        // 编辑对话框信息
          updetform:{
            id:0,
          username:'',
          email:'',
          mobile:"",
        },
        // 角色对话框状态
        rolsVisible:false,
        // 角色数据
        slectedData:{},
        // 角色列表
        roles:[],

    };
  },
  methods: {
    // 封装函数
  async getUser(){
       let res = await this.$axios.get('users',{params: this.tableData})
        // console.log( res );
        this.pagenum = res.data.data.pagenum;
        this.total = res.data.data.total;
        this.userList = res.data.data.users;
    },
    //  页容量事件
    pageSizeChange(size){
      this.tableData.pagesize = size;
      this.tableData.pagenum = 1;
       this.getUser();
    },
    // 页码事件
    pageIndexChange(num){
      this.tableData.pagenum = num;
      this.getUser()
    },
    // 查寻用户
    searchUser(){
          this.getUser()
    },
    // 验证表单
  submit(formName) {
       this.$refs[formName].validate(  async valid => {
          if (valid) {
            // 验证成功
            // 添加用户
            let res= await this.$axios.post('users',this.form)
              // console.log( res)
              if(res.data.meta.status === 201){
                 this.$message({
                    message: res.data.meta.msg,
                    type: 'success'
                  });
                  
              // 关闭对话框
              this.visible = false;
              // 清空表单数据
                  for (const key in this.form) {
                          this.form[key] = '';  
                  }
              // 重新渲染页面
               this.getUser();
               
              } 
          } else {
            // 验证失败
            this.$message.error('数据错误!');
            return false;
          }
        });
  },

    // 删除用户
  dlt(id){
        // console.log( id );
         this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
          // 删除请求
             let res = await this.$axios.delete(`users/${id}`)
              // console.log( res);
             if(res.data.meta.status===200){
                this.$message({
                    message: res.data.meta.msg,
                    type: 'success'
                  });
                 // 刷新页面
                  this.getUser()
             }else{
                    this.$message.error('删除失败');
             }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
  // 修改用户状态
  async statusChange(data){
    // console.log( data );
      let res = await this.$axios.put(`users/${data.id}/state/${data.mg_state}`)
  },
  
  // 进入编辑用户信息
  async bianJi(id){
    // 打开编辑框
    this.updetVisible = true;
      // 获取服务器端用户信息
    let res = await this.$axios.get(`users/${id}`)
      //  console.log( res );
      for (const key in res.data.data) {
          this.updetform[key] = res.data.data[key];
      }
  },

  // 提交修改用户信息
  updetSubmit( updetfro){
        this.$refs[ updetfro].validate(  async valid => {
          if (valid) {
            // 验证成功
            // 提交修改
            let res= await this.$axios.put(`users/${this.updetform.id}`,this.updetform)
              // console.log( res)
              if(res.data.meta.status === 200){
                // 成功
                 this.$message({
                    message: res.data.meta.msg,
                    type: 'success'
                  });
              
              // 关闭对话框
              this.updetVisible = false,
              // 重新渲染页面
               this.getUser();
              } 
          } else {
            // 验证失败
            this.$message.error('数据错误!');
            return false;
          }
        });
  },
  
  // 分配用户角色信息
  async rols(rolsData){
    this.rolsVisible = true;
    console.log( rolsData );
    // 保存用户角色
    this.slectedData = rolsData
   let res = await this.$axios.get('roles');
  //  console.log( res );
   this.roles = res.data.data
  },
  // 提交用用户角色修改
  async rolsSubmit(){

      let res = await this.$axios.put(`users/${this.slectedData.id}/role`,{
        rid:this.slectedData.role_name
  });
  // console.log( res );
  // 提示axios拦截器已做完
  // 关闭弹框
  this.rolsVisible = false;
  
  }

  },
  created() {
      // 获取用户列表数据
      this.getUser();
  },
};
</script>
<style>
.search{
  background-color: #d3dce6;
}
</style>
