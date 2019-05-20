<template>
<!-- 问题还没解决有空研究 -->
  <div class="content-addgoods">
    <!-- 面包屑导航 -->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <mianbaoxu :title1="title1" :title2="title2"></mianbaoxu>
        </div>
      </el-col>
    </el-row>
    <!-- 警告 -->
    <el-row>
      <el-col :span="24" class="margin">
        <div class="grid-content bg-purple-dark">
          <el-alert title="添加商品信息" type="warning" center></el-alert>
        </div>
      </el-col>
    </el-row>
    <!-- 时间线 -->
    <el-row class="margin padd">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-steps :space="200" :active="+activeName" finish-status="success">
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
          </el-steps>
        </div>
      </el-col>
    </el-row>
    <!-- tabs标签 -->
    <el-row>
      <el-col :span="24" class="margin">
        <div class="grid-content bg-purple-dark">
          <el-tabs tab-position="left" style="height: 500px; " v-model="activeName">
                <!-- 基本信息 -->
            <el-tab-pane label="基本信息" name= "0">
                <!-- form表单 -->
              <el-form
                :model="goodsForm"
                :rules="rules"
                ref="goodsFormData"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item label="商品名称" prop="goods_name">
                  <el-input v-model="goodsForm.goods_name"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" prop="goods_price">
                  <el-input v-model="goodsForm.goods_price"></el-input>
                </el-form-item>
                <el-form-item label="商品重量" prop="goods_weight">
                  <el-input v-model="goodsForm.goods_weight"></el-input>
                </el-form-item>
                <el-form-item label="商品数量" prop="goods_number">
                  <el-input v-model="goodsForm.goods_number"></el-input>
                </el-form-item>
                <el-form-item label="商品分类" prop="goods_cat">
                   <el-cascader
                        expand-trigger="hover"
                        :options="options"
                        :props="{label: 'cat_name', value: 'cat_id' }"
                        v-model="goodsForm.goods_cat"
                        @change="handleChange">
                    </el-cascader>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <!-- 商品参数 -->
            <el-tab-pane label="商品参数"  name= "1">商品参数</el-tab-pane>
            <!-- 选择商品属性 -->
            <el-tab-pane label="商品属性"  name= "2">商品属性</el-tab-pane>
            <!-- 上传商品图片 -->
            <el-tab-pane label="商品图片"  name= "3">
                <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :headers="uploadHeaders"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :on-success="uploadSuccess"
                    :before-remove="beforeRemove"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-tab-pane>
            <!-- 商品内容描述 -->
            <el-tab-pane label="商品内容"  name= "4">
                <el-button type="success" @click="goodsSubmint()">添加商品</el-button>
                     <vue-editor v-model="goodsForm.goods_introduce" placeholder="请输入"></vue-editor>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// 导入文本插件
import { VueEditor } from 'vue2-editor'
export default {
  name: "addgoods",
//   注册
  components: {
      VueEditor
   },
  data() {
    return {
      // 面包屑标题
      title1: "商品管理",
      title2: "商品列表",
      // tabg标签状态
      activeName: 0,
   
    //   添加商品基本信息
      goodsForm:{
          goods_name:'',
          goods_price:"",
          goods_weight:'',
          goods_number:'',
          goods_cat: [],
          // goods_introduce
      },
      //表单规则
      rules:{
              goods_name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
          ],
              goods_price: [
            { required: true, message: '请输入商品价格', trigger: 'blur' },
          ],
              goods_weight: [
            { required: true, message: '请输入商品重量', trigger: 'blur' },
          ],
              goods_number: [
            { required: true, message: '请输入商品数量', trigger: 'blur' },
          ],
              goods_cat: [
            { required: true, message: '请输入商品分类', trigger: 'blur' },
          ],
      
      },
      // 级联菜单的所有选项
      options:[],
      // 默认选中项
      selectedOptions2:[],
    
       // 上传图片时候的请求头
      uploadHeaders: {
        // 注意：必须这么写
        Authorization: localStorage.getItem('token')
      },
       //   富文本描述
     content:'',
    };
  },
  methods: {
    //   添加商品
        goodsSubmint(){
              this.$refs.goodsFormData.validate(  async valid => {
                    if (!valid) {
              this.$message.error('请填写必要的商品信息！');
               }

        });
        },
        
        // 级联选择器事件
        handleChange(){

        },

    //   上传图片删除前的函数
       beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
  }
};
</script>
<style>
.content-addgoods .margin {
  margin: 20px 0;
}
.content-addgoods .padd {
  padding-left: 200px;
}
</style>


