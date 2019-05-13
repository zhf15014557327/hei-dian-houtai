<template>
  <div class="conten-index">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">
              <img src="../assets/logo.jpeg" alt>
            </div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple-light">
              <h1>黑店后台管理系统</h1>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">
              <el-button type="success" @click="loginOut">退出</el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container >
        <el-aside width="200px" >
         
          <el-menu default-active="2" class="el-menu-vertical-demo" unique-opened router :collapse="isCollapse">
             <el-radio-group v-model="isCollapse" style="">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group>
            <el-submenu :index="item.order+''" v-for="(item, index) in menusList" :key="item.id">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="(it, i) in item.children"
                  :key="it.id"
                  :index="it.path"
                >
                  <i class="el-icon-menu"></i>
                  <span slot="title">{{it.authName}}</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      // 左侧菜单数据
      menusList: [],
      isCollapse:false,
    };
  },
  created() {
    // 左侧菜单数据
    this.$axios.get("menus").then(res => {
      // console.log(res);
      this.menusList = res.data.data;
    });
  },
  //   方法
  methods: {
    //   退出事件
    loginOut() {
      //   删除token
      window.sessionStorage.removeItem("token");
      this.$router.push("/login");
    }
  }
};
</script>
<style lang="scss">
.conten-index {
  height: 100%;
  .el-container {
    height: 100%;
    .el-header {
      padding: 0;
      background-color: #b3c0d1;
      color: #333;
      text-align: center;
      line-height: 60px;
      img {
        height: 60px;
        width: 60px;
        display: block;
      }
    }
    .el-aside {
   
      background-color: #ffffff;
      color: #333;
      text-align: left;
      line-height: 0;
     
   
      .el-menu{
        overflow: hidden;
       
      }
      .el-radio-button__inner{
        border: none;
      }
    }

    .el-main {
      background-color: #e9eef3;
      color: #333;
      padding:0 0 0 20px;
    }
  }
  
}
</style>

