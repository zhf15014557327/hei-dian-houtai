// 导入vue
import Vue from 'vue'
// 导入moment.js注册全局时间戳过滤器
import moment from "moment"
// 注册过滤器
Vue.filter("beautifyTiem",(value)=>{ 
 return moment(value).format('YYYY年MM月DD日  HH:mm:ss')
})

  // 导面包屑
  import mianbaoxu from "../components/mianbaoxu.vue"
//   注册全局组件
  Vue.component("mianbaoxu",mianbaoxu)
// 导入element-ui
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入axios
import axios from "../lib/vue-axios"
Vue.use(axios)
