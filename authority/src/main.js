/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2023-07-18 22:41:57
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-06 17:09:00
 * @FilePath: \Front-end\Vue\Vue3\demo\认证\authority\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import "./assets/main.css";

import { createApp } from "vue";
import pinia from "@/stores/";
import App from "./App.vue";
import router from "./router";
import { userStore } from "@/stores/user";
import data from "../public/version.json";
function init() {
  const useUserStore = userStore(pinia);
  useUserStore.initUserInfo();
  if (useUserStore?.userInfo?.token) {
    useUserStore.addRoutes(router);
  }
  const app = createApp(App);
  app.config.globalProperties.$timestamp = data.timestamp;
  window.__VUE_APP__ = app;
  app.use(router).use(pinia).mount("#app");
}
init();
