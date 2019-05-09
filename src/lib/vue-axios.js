import axios from "axios";
// 设置基地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';


// 插件按需导入
import {Message} from 'element-ui';
// 统一携带token
// axios.defaults.headers.Authorization = JSON.parse(window.sessionStorage.getItem('token')) ||  "";
// axios拦截器
// 添加请求拦截器
axios.interceptors.request.use( (config) => {
    // 在发送请求之前做些什么
    if(config.url.indexOf('login')==-1){
        // 排除登录接口,添加token
        config.headers.Authorization = JSON.parse(window.sessionStorage.getItem('token')) ;
    }
    return config;
  },  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use( (response) => {
    // 对响应数据做点什么
    // console.log( response );
    if(response.data.meta.status === 200){
        // 成功
        Message.success(response.data.meta.msg);
    }else if(response.data.meta.status === 400){
        // 失败
        Message.error(response.data.meta.msg);
    }
    return response;
  },  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
// 暴露出去
export default {
    install(Vue){
        Vue.prototype.$axios = axios;
    }
}