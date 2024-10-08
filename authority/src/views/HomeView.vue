<!--
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2023-07-18 22:41:57
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-06 16:11:45
 * @FilePath: \Front-end\Vue\Vue3\demo\认证\authority\src\views\HomeView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import { RouterView, RouterLink, useRouter } from 'vue-router'
import { userStore } from '@/stores/user'
const useUserStore = userStore();
const router = useRouter();
const fetchFn = async () => {
  const response = await fetch("/api/types").then((response) =>
    response.json()
  );
  console.log(response);
}
async function logout() {
  const msg = await useUserStore.logout();
  alert(msg)
}
</script>

<template>
  <main>
    <TheWelcome />
    <router-link to="/login" class="router">点击前往登录页面</router-link>
    <button @click="() => { router.push('/message') }" class="router">
      <span> 点击前往消息中心</span>
    </button>
    <button @click="() => { router.push('/publish') }" class="router">
      <span>点击前往发布中心 </span>
    </button>
    <button @click="() => { router.push('/manager') }" class="router">
      <span>点击前往管理中心 </span>
    </button>
    <button @click="() => { router.push(`/userinfo/${useUserStore.userInfo.username}`) }">
      <span>用户中心 </span>
    </button>
    <button @click="() => { router.push('/about') }" class="router">
      <span>关于 </span>
    </button>
    <button @click="logout" class="router">
      <span>退出登录 </span>
    </button>

    <div class="route">
      <RouterView></RouterView>
    </div>
  </main>
</template>
<style>
.route {
  width: 100%;
  height: 500px;
  /* background-color:green; */
}

.router {
  margin: 0 20px;
}
</style>
