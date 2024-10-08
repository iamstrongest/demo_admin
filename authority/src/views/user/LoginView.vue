<!--
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2023-08-03 23:19:07
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-06 12:22:33
 * @FilePath: \Front-end\Vue\Vue3\demo\authority\src\views\user\LoginView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { reactive } from 'vue';
import { useRouter, } from 'vue-router';
import { userStore } from '@/stores/user'
// const router = useRouter();
const useUserStore = userStore();
const formInfo = reactive({
    username: "",
    password: ""
})
async function login(e) {
    e.preventDefault();
    await useUserStore.login(formInfo);
}

</script>
<template>
    <div class="login-container">
        <h1>欢迎来到登录界面</h1>
        <form @submit.prevent="login">
            <input type="text" name="username" id="" v-model="formInfo.username">
            <input type="password" name="password" v-model="formInfo.password">
            <button type="reset">重置</button>
            <button type="submit">点击登录</button>
        </form>

    </div>
</template>

<style>
@media (min-width: 1024px) {
    .login-container {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>
