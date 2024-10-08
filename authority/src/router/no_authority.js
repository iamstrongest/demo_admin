/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2023-08-03 23:28:03
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-08 15:07:45
 * @FilePath: \Front-end\Vue\Vue3\demo\认证\authority\src\router\no_authority.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const no_auth_routes_path = ["/", "/login", "/notFound"];
export const no_auth_routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/user/LoginView.vue"),
  },
  {
    path: "/notFound",
    name: "notFound",
    component: () => import("@/views/no_found/NoFoundView.vue"),
  },
];
