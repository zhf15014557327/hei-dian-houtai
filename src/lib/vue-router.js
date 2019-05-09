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
import users from "../components/users.vue"

// 创造一个路由对象
let router = new VueRouter({
    routes: [
        {
            path:"/",
            redirect:"index", 
        },
        {
            path:"/login",
            component:login, 
        },
        {
            path:"/index",
            component:index,
            children:[
                // {
                //     path:"",
                //     redirect:"users", 
                // },
                {
                    path:"users",
                    component:users, 
                },
            ]
        },
      
    ]
});
// 导航守卫
router.beforeEach((to, from, next) => {
   if(to.path.indexOf("login")==-1){
        if(JSON.parse(window.sessionStorage.getItem('token'))){
            next();
        }else{
            Message.error('还没登录哟!去登录吧');
            next('/login');
        }
   }else{
        next(); 
   }
  })
// 导出路由 
export default router