import { createApp } from 'vue'
import pinia from './store'
import App from './App.vue'
// virtual: 前缀表示这是一个虚拟模块（非物理文件），由 UnoCSS 的 Vite 插件在构建过程中实时生成
import 'virtual:uno.css'
import './assets/reset.css'
const app = createApp(App)
app.use(pinia)
app.mount('#app')
