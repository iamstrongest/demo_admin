/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2023-07-18 22:41:57
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-08 15:24:03
 * @FilePath: \Front-end\Vue\Vue3\demo\authority\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHistory } from "vue-router";
import { no_auth_routes_path, no_auth_routes } from "@/router/no_authority";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: no_auth_routes,
});
router.beforeEach((to, from, next) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (to.redirectedFrom?.path) {
    localStorage.setItem("redirectHref", to.redirectedFrom?.path);
  }
  if (no_auth_routes_path.includes(to.path)) {
    next();
    return;
  }

  if (userInfo?.token && to.meta?.need === false) {
    next();
    return;
  }
  if (userInfo?.token && router.hasRoute(to.name)) {
    next();
    return;
  }

  if (userInfo?.token && !router.hasRoute(to.name)) {
    next(`/notFound?path=${to.fullpath || to.path}`);
    return;
  }
  next("/login");
});
export default router;
