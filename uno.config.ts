import { presetWind3 } from '@unocss/preset-wind3'
import { defineConfig, presetTypography } from 'unocss'

// UnoCSS 提供的配置函数，用于规范配置对象的类型
export default defineConfig({
    // 用于启用 UnoCSS 的预设功能
    presets: [
        // UnoCSS 的官方预设，激活 Tailwind v3 兼容的原子化工具类
        presetWind3(),
        // UnoCSS 的排版预设，用于快速生成美观的文本样式（如文章段落、标题层级、引用块等），提供 prose 等工具类简化富文本排
        presetTypography(),
    ],
})