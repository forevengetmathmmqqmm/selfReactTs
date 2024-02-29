import axios from "axios"
import Cookies from "cookies-ts"
const cookies = new Cookies()
const source = axios.CancelToken.source()
const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 50000,
  cancelToken: source.token,
})
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  let token = cookies.get('token');
  config.headers.authorization = token;
  return config;
}, function (error) {
  return Promise.reject(error);
});

request.interceptors.response.use(function (response) {
  if (response.data.code == 20001) {
    location.href = '/login';
    source.cancel('请求已被手动取消');
  } else {
    return response.data;
  }
}, function (error) {
  return Promise.reject(error);
});
export default request;