// 封装axios
import axios from "axios";

// 创建一个 axios 实例
let $axios = axios.create({
    // baseURL: "http://localhost:3030/api",
    baseURL: "/api",    // 解决跨域后的请求地址
    timeout: 3000
})



// 添加请求拦截器
$axios.interceptors.request.use(function (config) {
    return config;
}), function (error) {
    return Promise.reject(error);
}

// 添加响应拦截器
$axios.interceptors.response.use(function (response) {
    return response.data;
}), function (error) {
    return Promise.reject(error);
}



export default $axios;