import axios from 'axios'

//配置信息
const API = axios.create({
	baseURL:'http://localhost:10100', //请求后端数据的基本地址
	timeout: 2000                   //请求超时设置，ms
})

//导出
export default API
