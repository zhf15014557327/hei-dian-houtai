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
          v-model="selectedOptions2"
          @change="getRolesinof"
          :show-all-levels="false"
          :props="props"
        ></el-cascader>
      </el-col>
    </el-row>
    <!-- tob栏 -->
    <el-row class="padding">
      <el-col :span="24">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="动态参数" name="many">
            <el-row>
              <el-col :span="24">
                <!-- 添加动态参数按钮 -->
                <el-button
                  type="success"
                  @click="addmanyVisible=true"
                  :disabled="btndisabled"
                >添加动态参数</el-button>
              </el-col>
            </el-row>
            <!-- 表格 -->
            <el-row class="padding">
              <el-col :span="24">
                <el-table :data="manyData" border style="width: 100%">
                  <!-- 展开的table -->
                  <el-table-column type="expand">
                    <!-- 模板 -->
                    <template slot-scope="props">
                      <el-tag
                        class="pading"
                        v-for="item in props.row.items"
                        closable
                        @close="dletag(item ,props.row)"
                        :type="item.type"
                      >{{item}}</el-tag>

                      <span class="padding" v-if="props.row.items.length == 0">没有参数</span>

                      <el-input
                        class="input-new-tag"
                        v-if="inputVisible"
                        v-model="inputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm(props.row)"
                        @blur="handleInputConfirm(props.row)"
                      ></el-input>
                      <el-button
                        v-else
                        class="button-new-tag"
                        size="small"
                        @click="showInput"
                      >+ New Tag</el-button>
                    </template>
                  </el-table-column>

                  <el-table-column type="index" width="50"></el-table-column>
                  <el-table-column prop="attr_name" label="商品参数" width="200"></el-table-column>
                  <el-table-column prop="name" label="操作">
                    <template slot-scope="scope">
                      <!-- 编辑 -->
                      <el-button
                        type="primary"
                        icon="el-icon-edit"
                        size="small"
                        circle
                        @click="manybianji(scope.row)"
                      ></el-button>
                      <!-- 删除 -->
                      <el-button
                        type="danger"
                        icon="el-icon-delete"
                        size="small"
                        circle
                        @click="manyDlt(scope.row)"
                      ></el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="静态参数" name="only">
            <el-row>
              <el-col :span="24">
                <!-- 添加静态参数按钮 -->
                <el-button
                  type="success"
                  @click="addOnlyVisible=true"
                  :disabled="btndisabled"
                >添加静态参数</el-button>
              </el-col>
            </el-row>
            <!-- 表格 -->
            <el-row class="padding">
              <el-col :span="24">
                <el-table :data="onlyData" border style="width: 100%">
                  <el-table-column type="index" width="50"></el-table-column>
                  <el-table-column prop="attr_name" label="属性名" width="200" align="center"></el-table-column>
                  <el-table-column prop="attr_vals" label="属性值" width="200" align="center"></el-table-column>
                  <el-table-column prop="name" label="操作" align="left">
                    <template slot-scope="scope">
                      <!-- 编辑 -->
                      <el-button
                        type="primary"
                        icon="el-icon-edit"
                        size="small"
                        circle
                        @click="onlybianji(scope.row)"
                      ></el-button>
                      <!-- 删除 -->
                      <el-button
                        type="danger"
                        icon="el-icon-delete"
                        size="small"
                        circle
                        @click="onlyDlt(scope.row)"
                      ></el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <!-- 编辑动态框 -->
    <el-dialog title="编辑动态参数" :visible.sync="manyVisible">
      <el-form :model="manydata" label-position="right" :rules="rules">
        <el-form-item label="参数名称" prop="attr_name" label-width="100px">
          <el-input v-model="manydata.attr_name" autocomplete="off" placeholder="请输角色名称"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="manyVisible = false">取 消</el-button>
        <el-button type="primary" @click="manysubmint()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑静态框 -->
    <el-dialog title="编辑静态参数" :visible.sync="onlyVisible">
      <el-form :model="onlydata" label-position="right" :rules="rules">
        <el-form-item label="属性名称" prop="attr_name" label-width="100px">
          <el-input v-model="onlydata.attr_name" autocomplete="off" placeholder="请输属性名称"></el-input>
        </el-form-item>
        <el-form-item label="属性值" prop="attr_vals" label-width="100px">
          <el-input v-model="onlydata.attr_vals" autocomplete="off" placeholder="请输属性值"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="onlyVisible = false">取 消</el-button>
        <el-button type="primary" @click="onlysubmint()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加动态框 -->
    <el-dialog title="添加动态参数" :visible.sync="addmanyVisible">
      <el-form :model="addmanydata" label-position="right" :rules="rules">
        <el-form-item label="参数名称" prop="attr_name" label-width="100px">
          <el-input v-model="addmanydata.attr_name" autocomplete="off" placeholder="请输参数名称"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addmanyVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMany">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加静态框 -->
    <el-dialog title="添加静态参数" :visible.sync="addOnlyVisible">
      <el-form :model="addonlydata" label-position="right" :rules="rules">
        <el-form-item label="属性名称" prop="attr_name" label-width="100px">
          <el-input v-model="addonlydata.attr_name" autocomplete="off" placeholder="请输属性名称"></el-input>
        </el-form-item>
        <el-form-item label="属性值" prop="attr_vals" label-width="100px">
          <el-input v-model="addonlydata.attr_vals" autocomplete="off" placeholder="请输属性值"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addOnlyVisible = false">取 消</el-button>
        <el-button type="primary" @click="addonly">确 定</el-button>
      </div>
    </el-dialog>
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
      // 级联菜单数据
      options: [],
      // 级联菜单
      selectedOptions2: [],
      // 起别名
      props: {
        value: "cat_id",
        label: "cat_name"
      },
      // tob栏选中状态
      activeName: "many",
      // 按钮禁用状态
      btndisabled: true,
      // 动态数据
      manyData: [],
      // 静态数据
      onlyData: [],
      // 参数数组
      items: [],
      // 表单是否显示
      inputVisible: false,
      // 表单显示时为空
      inputValue: "",
      // 编辑动态框状态
      manyVisible: false,
      // 动态参数据
      manydata: {},
      // 添加动态框状态
      addmanyVisible: false,
      // 添加动态参数据
      addmanydata: {},

      // 添加静态框状态
      addOnlyVisible: false,
      // 添加静态参数据
      addonlydata: {},

      // 编辑静态参数框状态
      onlyVisible: false,
      // 编辑静态参数据
      onlydata: {},

      // 规则
      rules: {
        attr_name: [
          { required: true, message: "请输入参数名称", trigger: "change" }
        ],
        attr_vals: [
          { required: true, message: "请输入参数名称", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    // 级联选择器事件
    async getRolesinof() {
      if (this.selectedOptions2.length === 3) {
        let res = await this.$axios.get(
          `categories/${this.selectedOptions2[2]}/attributes?sel=${
            this.activeName
          }`
        );
        //  console.log(res)
        if (res.data.meta.status == 200) {
          // 动态添加items属性
          if (this.activeName == "many") {
            res.data.data.forEach(v => {
              v.items = v.attr_vals.split(",");
            });
          }
          this[this.activeName + "Data"] = res.data.data;
          // 解除按钮禁用
          this.btndisabled = false;
        }
      } else {
        this.btndisabled = true;
      }
    },

    // tab栏事件getRolesinof
    handleClick() {
      this.getRolesinof();
    },

    // 参数删除点击事件
    async dletag(it, Data) {
      Data.items.splice(Data.items.indexOf(it), 1);
      let sendData = {
        attr_name: Data.attr_name,
        attr_sel: Data.attr_sel,
        attr_vals: Data.items.join(",")
      };
      // http://127.0.0.1:8888/api/private/v1/categories/6/attributes/3077
      let res = await this.$axios.put(
        `categories/${Data.cat_id}/attributes/${Data.attr_id}`,
        sendData
      );
      //  let res = await this.$axios.delete(`categories/${Data.cat_id}/attributes/${Data.attr_id}`)
      //  console.log( res );
    },
    // 点击按钮标签,显示input标签,获取焦点
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    // input失焦事件和enter键盘弹起事件
    async handleInputConfirm(data) {
      // console.log( data );
      // console.log(   this.itmes);
      // 获取input文本
      let inputValue = this.inputValue;
      //  判断有文本
      if (inputValue) {
        // 添加到数组中
        data.items.push(inputValue);
      }
      // 准备数据
      let sendData = {
        attr_name: data.attr_name,
        attr_sel: data.attr_sel,
        attr_vals: data.items.join(",")
      };
      let res = await this.$axios.put(
        `categories/${data.cat_id}/attributes/${data.attr_id}`,
        sendData
      );
      //  console.log( res );
      // 隐藏input
      this.inputVisible = false;
      // 清空input'
      this.inputValue = "";
    },

    // 进入编辑动态参数
    manybianji(inof) {
      // 打开参数编辑框
      this.manyVisible = true;
      // 获取商品参数
      this.manydata = inof;
      // console.log( inof );
    },

    //删除动态参数
    async manyDlt(dledata) {
      // console.log( dledata );
      this.$confirm("此操作将永久删除该参数, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // 删除请求
          let res = await this.$axios.delete(
            `categories/${dledata.cat_id}/attributes/${dledata.attr_id}`
          );
          // console.log( res );
          if (res.data.meta.status == 200) {
            this.$message({
              message: res.data.meta.msg,
              type: "success"
            });
            this.getRolesinof();
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

    // 提交编辑动态框参数
    async manysubmint() {
      // 准备数据
      let senData = {
        attr_name: this.manydata.attr_name,
        attr_sel: this.manydata.attr_sel
      };
      //  http://127.0.0.1:8888/api/private/v1/categories/74/attributes/3210
      let res = await this.$axios.put(
        `categories/${this.manydata.cat_id}/attributes/${
          this.manydata.attr_id
        }`,
        senData
      );
      if (res.data.meta.status == 200) {
        this.manyVisible = false;
      }
    },

    // 添加动态参数
    async addMany() {
      // console.log( this.addmanydata.attr_name );

      let senddata = {
        attr_id: "",
        attr_name: this.addmanydata.attr_name,
        attr_sel: "many"
      };
      //  Request URL: http://127.0.0.1:8888/api/private/v1/categories/6/attributes?sel=many
      let res = await this.$axios.post(
        `categories/${this.selectedOptions2[2]}/attributes`,
        senddata
      );
      //  console.log( res );
      if (res.data.meta.status == 201) {
        // 关闭对话框
        this.addmanyVisible = false;
      }
      this.getRolesinof();
    },

    // 添加静态参数
    async addonly() {
      let eitsdata = {
        attr_id: "",
        attr_vals: this.addonlydata.attr_vals,
        attr_name: this.addonlydata.attr_name,
        attr_sel: "only"
      };
      let res = await this.$axios.post(
        `categories/${this.selectedOptions2[2]}/attributes`,
        eitsdata
      );
      //  console.log( res );
      if (res.data.meta.status == 201) {
        this.addOnlyVisible = false;
      }
      // 重新渲染
      this.getRolesinof();
    },

    // 编辑静态参数
    onlybianji(onlyinof) {
      // 打开参数编辑框
      this.onlyVisible = true;
      // 获取商品参数
      this.onlydata = onlyinof;
    },

    // 提交编辑静态参数
    async onlysubmint() {
      // 准备数据
      let onlysenData = {
        attr_vals: this.onlydata.attr_vals,
        attr_name: this.onlydata.attr_name,
        attr_sel: "only"
      };
      console.log(this.onlydata);
      //  http://127.0.0.1:8888/api/private/v1/categories/74/attributes/3210
      let res = await this.$axios.put(
        `categories/${this.onlydata.cat_id}/attributes/${
          this.onlydata.attr_id
        }`,
        onlysenData
      );
      console.log(res);
      if (res.data.meta.status == 200) {
        this.onlyVisible = false;
      }
    },

    // 删除静态参数
    async onlyDlt(dleOnlydata) {
      // console.log( dledata );
      this.$confirm("此操作将永久删除该参数, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await this.$axios.delete(
            `categories/${dleOnlydata.cat_id}/attributes/${dleOnlydata.attr_id}`
          );
          // console.log( res );
          if (res.data.meta.status == 200) {
            this.$message({
              message: res.data.meta.msg,
              type: "success"
            });
            this.getRolesinof();
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
    }
  },
  async created() {
    // 获取用户列表数据
    let res = await this.$axios.get("categories?type=3");
    // console.log(res);
    if (res.data.meta.status == 200) {
      this.options = res.data.data;
    }
    // 加载显示默认选项
    //  this.getRolesinof();
  }
};
</script>
<style>
.pading {
  margin: 0 10px;
}
.cascader {
  margin-right: 20px;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
