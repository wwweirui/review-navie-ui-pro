import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// virtual: 前缀表示这是一个虚拟模块（非物理文件），由 UnoCSS 的 Vite 插件在构建过程中实时生成
import 'virtual:uno.css'
// 引入 Eric Meyer 风格的 CSS 重置样式表。 
// 这是一个流行的 CSS 重置样式表，用于重置浏览器的默认样式，确保不同浏览器之间的一致性。
import '@unocss/reset/eric-meyer.css'

createApp(App).mount('#app')
