import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
// 导入全局样式
import "./assets/style.css"
// 导入插件
import "./lib/Plugins"
// 导入路由
import router from "./lib/vue-router"

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
