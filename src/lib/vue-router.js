import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 插件按需导入
import {Message} from 'element-ui';
// 注册一下



// 导入组件const Foo = () => import('./Foo.vue')
// 登录
const  login = () => import ("../components/login.vue")
// 首页
const  index = () => import ("../components/index.vue")
// 用户列表
const  users = () => import ("../components/users.vue")
// 角色列表
const  roles = () => import ("../components/roles.vue")
// 权限列表
const  rights = () => import ("../components/rights.vue")
// 商品列表
const  goods = () => import ("../components/goods.vue")
// 分类参数
const  params = () => import ("../components/params.vue")
// 商品分类
const  categories = () => import ("../components/categories.vue")
// 订单列表
const  orders = () => import ("../components/orders.vue")
// 数据统计
const  reports = () => import ("../components/reports.vue")
// 添加商品
const  addgoods = () => import ("../components/myAddgoods.vue")

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