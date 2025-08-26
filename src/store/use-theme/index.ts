import type { ProConfigProviderProps } from "pro-naive-ui";
import { generate } from "@ant-design/colors";
import { preferenceConfig } from "@root/preference";
import { usePreferredDark } from "@vueuse/core";
import { darkTheme } from "naive-ui";
import { defineStore } from "pinia";
import { computed, ref, watchEffect } from "vue";

export const useThemeStore = defineStore("theme", () => {
    // 主题选项配置
    const systemThemeIsDark = usePreferredDark();
    const grayscale = ref(preferenceConfig.theme.grayscale);
    const primaryColor = ref(preferenceConfig.theme.primaryColor);
    // 色弱模式
    const colorWeakness = ref(preferenceConfig.theme.colorWeakness);
    const themeMode = ref<"light" | "dark" | "auto">(
        preferenceConfig.theme.mode as any
    );
    // 是否为暗黑模式
    const isDark = computed(() => {
        return (
            themeMode.value === "dark" ||
            (themeMode.value === "auto" && systemThemeIsDark.value)
        );
    });

    // 主题配置
    const themeProps = computed<ProConfigProviderProps>(() => {
        const colors = generate(primaryColor.value, {
            theme: isDark.value ? "dark" : "default",
        });
        return {
            theme: isDark.value ? darkTheme : undefined,
            themeOverrides: {
                common: {
                    primaryColor: colors[5],
                    primaryColorHover: colors[6],
                    primaryColorSuppl: colors[4],
                    primaryColorPressed: colors[7],
                },
            },
        };
    });

    function toggleThemeMode() {
        themeMode.value = isDark.value ? "light" : "dark";
    }

    function $reset() {
        grayscale.value = preferenceConfig.theme.grayscale;
        themeMode.value = preferenceConfig.theme.mode as any;
        primaryColor.value = preferenceConfig.theme.primaryColor;
        colorWeakness.value = preferenceConfig.theme.colorWeakness;
    }

    // 监听 grayscale 和 colorWeakness 的变化，自动更新滤镜样式
    watchEffect(() => {
        // 根据 grayscale 状态生成灰度滤镜样式：开启时 100% 灰度，关闭时无灰度
        const grayscaleStyle = grayscale.value
            ? "grayscale(100%)"
            : "grayscale(0%)";
        // colorWeakness 状态生成色弱滤镜样式：开启时 80% 反色（增强色弱用户辨识度），关闭时无反色
        const colorWeaknessStyle = colorWeakness.value
            ? "invert(80%)"
            : "invert(0%)";
        // 将灰度和色弱滤镜组合，并应用到页面根元素（<html>）的 style 
        document.documentElement.style.filter = `${grayscaleStyle} ${colorWeaknessStyle}`;
    });

    return {
        $reset,
        isDark,
        grayscale,
        themeMode,
        themeProps,
        primaryColor,
        colorWeakness,
        toggleThemeMode,
    };
});
