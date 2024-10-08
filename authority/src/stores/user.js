/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2023-07-18 22:41:57
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-08 15:27:32
 * @FilePath: \Front-end\Vue\Vue3\demo\认证\authority\src\stores\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import routes from "@/router/authority";
import router from "../router";
import { no_auth_routes } from "@/router/no_authority";
export const userStore = defineStore("user", () => {
  const userInfo = reactive({
    token: "",
    roleType: [],
    username: "",
  });
  // const doubleCount = computed(() => count.value * 2);
  function initUserInfo() {
    if (judgeStorageItem("userInfo")) {
      const userInfoStorage = parseStorageItem("userInfo");
      userInfo.token = userInfoStorage.token;
      userInfo.roleType = userInfoStorage.roleType;
      userInfo.username = userInfoStorage.username;
    }
  }
  async function getUserInfo() {
    const response = await fetch("/api/user").then((response) =>
      response.json()
    );
    userInfo.token = response?.userInfo.token;
    userInfo.roleType = response?.userInfo.roleType;
    userInfo.username = response?.userInfo.username;
    localStorage.setItem("userInfo", JSON.stringify(response.userInfo || {}));
  }
  async function login(formInfo) {
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(formInfo),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    if (response.code === 401) {
      alert(response.msg);
      await logout();
      return;
    }
    userInfo.token = response?.userInfo.token;
    userInfo.roleType = response?.userInfo.roleType;
    userInfo.username = response?.userInfo.username;
    localStorage.setItem("userInfo", JSON.stringify(response.userInfo || {}));
    addRoutes(router);
    alert(response.msg);
    const href = localStorage.getItem("redirectHref");
    if (href) {
      router.replace(href);
      localStorage.removeItem("redirectHref");
      return;
    }
    router.back();
  }
  async function logout() {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("redirectHref");
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("退出成功");
      }, 500);
    });
  }
  function removeRoutes(router) {
    const routes = router.getRoutes();
    routes.forEach((route) => router.removeRoute(route.name));
  }
  function addRoutes(router) {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const roleType = userInfo.roleType;
    //先删除已经有的路由，不同权限的操作者，如同不进行刷新操作，再次访问登录页面登录其它权限账号，会导致原来的权限路由保留
    removeRoutes(router);
    //新增不需要认证的权限路由
    no_auth_routes.forEach((route) => {
      router.addRoute(route);
    });
    //新增需要认证的对应权限的路由
    routes.forEach((route) => {
      if (
        !route.meta.need ||
        (route.meta.need && roleType?.includes(route.meta.roleType))
      ) {
        router.addRoute(route);
      }
    });
  }
  function judgeStorageItem(item) {
    return localStorage.getItem(item) ? true : false;
  }
  function parseStorageItem(item) {
    return JSON.parse(localStorage.getItem(item));
  }
  return { userInfo, getUserInfo, addRoutes, login, logout, initUserInfo };
});
