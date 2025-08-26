import path from 'node:path'
import vue from '@vitejs/plugin-vue'
// Naive UI Pro 组件库的自动导入解析器，用于在 Vite 中自动导入和注册 Naive UI Pro 组件
import { ProNaiveUIResolver } from 'pro-naive-ui-resolver'
// 用于自动导入 Vue 组件（无需手动写 import 语句）。
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import { preferenceConfig } from './preference'

export default defineConfig({
  plugins: [
    vue(),
    // 配置 HTML 模板
    createHtmlPlugin({
      // 注入数据到 HTML 模板中
      inject: {
        data: {
          title: preferenceConfig.title,
          primaryColor: preferenceConfig.theme.primaryColor,
        },
      },
    }),
    // 配置组件自动导入
    Components({
      // 集成组件解析器
      resolvers: [
        NaiveUiResolver(),
        ProNaiveUIResolver(),
      ],
    }),
    // 配置 UnoCSS
    UnoCSS(),
  ],
  resolve: {
    // 配置别名，方便在项目中引用
    alias: {
      '@': `${path.resolve(__dirname, './src')}`,
      '@root': path.resolve(__dirname, './'),
    },
  },
})