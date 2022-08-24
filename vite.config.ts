import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import WindiCSS from "vite-plugin-windicss";

import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), WindiCSS()],
    resolve: {
        alias: {
            // @ts-ignore
            "~": resolve(__dirname, "src"),
        },
        extensions: [".js", ".json", ".ts"],
    },
    server: {
        proxy: {
            "/api": {
                target: "http://ceshi13.dishait.cn",
                changeOrigin: true,
                rewrite: (uri) => uri.replace(/^\/api/, ""),
            },
        },
    },
});
