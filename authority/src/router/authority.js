/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2023-08-03 23:04:32
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-08 14:41:13
 * @FilePath: \Front-end\Vue\Vue3\demo\认证\authority\src\router\authority.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const routes = [
  {
    path: "/userinfo/:id",
    meta: {
      need: true,
      roleType: 1,
    },
    name: "userinfo",
    component: () => import("@/views/user/UserView.vue"),
  },
  {
    path: "/message",
    meta: {
      need: false,
    },
    name: "message",
    component: () => import("@/views/user/MessageView.vue"),
  },
  {
    path: "/publish",
    meta: {
      need: true,
      roleType: 1,
    },
    name: "publish",
    component: () => import("@/views/user/PublishView.vue"),
  },
  {
    path: "/manager",
    meta: {
      need: true,
      roleType: 2,
    },
    name: "manager",
    component: () => import("@/views/user/ManagerView.vue"),
  },
];
export default routes;
