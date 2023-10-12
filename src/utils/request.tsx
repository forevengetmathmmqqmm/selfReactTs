import axios from "axios";
const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 1000,
})
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  let token = localStorage.getItem('token');
  config.headers.authorization = token;
  return config;
}, function (error) {
  return Promise.reject(error);
});

request.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});
export default request;