/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2023-07-18 22:41:57
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-08 15:35:14
 * @FilePath: \Front-end\Vue\Vue3\demo\authority\vite.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "/",
  build: {
    outDir: path.resolve(__dirname, "../backage/public"), //打包路径
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        // target: "http://121.43.58.18:3000",
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        // 因为此处代理时候，/api是后端也有/api字段开头，因此要进行重写以/api开头
        // 如果后端接口不是以/api开头，那就为rewrite: (path) => path.replace(/^\/api/, ""),
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
});
