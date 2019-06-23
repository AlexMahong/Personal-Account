import axios from 'axios'
import {Toast} from 'antd-mobile'

if(process.env.NODE_ENV === 'development'){
  axios.defaults.baseURL = 'http://localhost:3000'
}else if(process.env.NODE_ENV === 'production'){
  axios.defaults.baseURL = 'http://106.12.26.224:3000'
}
axios.defaults.withCredentials = true;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  Toast.loading('Loading');
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  Toast.hide();
  if(response.data.code === 200 && response.data.message!== ''){
    Toast.info(response.data.message)
  }else if(response.data.message!== ''){
    Toast.info(response.data.message)
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});