import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
// 导入全局样式
import "./assets/style.css"
  // 导入面包屑
  import mianbaoxu from "./components/mianbaoxu.vue"
  Vue.component("mianbaoxu",mianbaoxu)
// 导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 导入moment.js注册全局时间戳过滤器
import moment from "moment"
Vue.filter("beautifyTiem",(value)=>{ 
 return moment(value).format('YYYY年MM月DD日  HH:mm:ss')
})

// 导入路由
import router from "./lib/vue-router"
// 导入axios
import axios from "./lib/vue-axios"
Vue.use(axios)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
