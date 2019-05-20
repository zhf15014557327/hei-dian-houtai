import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 插件按需导入
import {Message} from 'element-ui';
// // 注册一下
// Vue.prototype.$message = Message;


// 导入组件
// 登录
import login from "../components/login.vue"
// 首页
import index from "../components/index.vue"
// 用户列表
import users from "../components/users.vue"
// 角色列表
import roles from "../components/roles.vue"
// 权限列表
import rights from "../components/rights.vue"
// 商品列表
import goods from "../components/goods.vue"
// 分类参数
import params from "../components/params.vue"
// 商品分类
import categories from "../components/categories.vue"
// 订单列表
import orders from "../components/orders.vue"
// 数据统计
import reports from "../components/reports.vue"
// 添加商品
import addgoods from "../components/myAddgoods.vue"

// 创造一个路由对象
let router = new VueRouter({
    routes: [
        // {
        //     path:"/",
        //     redirect:"index", 
        // },
        // 登录
        {
            path:"/login",
            component:login, 
        },
        // 首页
        {
            path:"/",
            component:index,
            children:[
                // 用户列表
                {
                    path:"users",
                    component:users, 
                },
                // 角色列表
                {
                    path:"roles",
                    component:roles,
                },
                // 权限列表
                {
                    path:"rights",
                    component:rights,
                },
                // 权限列表
                {
                    path:"goods",
                    component:goods,
                },
                // 分类参数
                {
                    path:"params",
                    component:params,
                },
                // 商品分类
                {
                    path:"categories",
                    component:categories,
                },
                // 订单列表
                {
                    path:"orders",
                    component:orders,
                },
                // 订单列表
                {
                    path:"reports",
                    component:reports,
                },
                // 添加商品
                {
                    path:"addgoods",
                    component:addgoods,
                },
            ]
        },
      
    ]
});
// 导航守卫路由跳转是触发,像node.js的中间键
router.beforeEach((to, from, next) => {
   if(to.path.indexOf("login")==-1){
    //    路径不是登录页,判断是否有token
        if(JSON.parse(window.sessionStorage.getItem('token'))){
            next();
        }else{
            Message.error('还没登录哟!去登录吧');
            next('/login');
        }
   }else{
    //    去登录的
        next(); 
   }
  })
// 导出路由 
export default router