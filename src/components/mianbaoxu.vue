<template>
  <el-breadcrumb>
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{title1}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{title2}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  props: ["title1", "title2"]
};
</script>
<style >
.el-breadcrumb{
  padding-left: 15px;
      background-color: #d3dce6;
}
.el-breadcrumb__item {
    height: 45px;
    line-height: 45px;

}
</style>
