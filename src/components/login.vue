<template>
  <div class="conten-login">
    <div class="form-box">
      <h2 class="login-title">用户登录</h2>
      <el-form
        :model="FormData"
        :rules="rules"
        ref="FormData"
        label-position="top"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="FormData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="FormData.password"></el-input>
        </el-form-item>
        <el-button type="success" class="el-btn" @click="submitForm('FormData')">登录</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      // 表单信息
      FormData: {
        username: "admin",
        password: "123456"
      },
      // 表单规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          {
            min: 6,
            max: 32,
            message: "长度在 6 到 32个字符",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 验证成功发送登录请求
          this.$axios.post("login", this.FormData).then(res => {
            // 登陆成功提示
            this.$message({
              message: "登录成功",
              type: "success"
            });
            // 保存token
            window.sessionStorage.setItem(
              "token",
              JSON.stringify(res.data.data.token)
            );
            // 登陆成功跳转
            this.$router.push("/");
          });
        } else {
          // 验证失败
          this.$message.error("用户名或密码错误");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss">
.conten-login {
  height: 100vh;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
  .form-box {
    padding: 40px;
    width: 560px;
    border-radius: 5px;
    background-color: #fff;
    .login-title {
      padding: 20px 0;
      text-align: center;
    }
    .el-btn {
      margin-top: 20px;
      width: 100%;
    }
  }
}
</style>
