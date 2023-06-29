

import { createApp } from 'vue'
import App from './App.vue'
import axios from '@/plugins/axiosInstance.js'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.mount('#app')
app.config.globalProperties.$axios=axios;