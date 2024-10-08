<!--
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2023-07-18 22:41:57
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-06 17:25:20
 * @FilePath: \Front-end\Vue\Vue3\demo\authority\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { onBeforeMount, onBeforeUnmount, getCurrentInstance } from "vue";
import { checkVersion } from "@/utils/index";
const {
  proxy
} = getCurrentInstance();
let intervalTime = null;
function intervalCheckVersion(time) {
  intervalTime = setInterval(() => {
    checkVersion(proxy.$timestamp);
  }, time);
}
// 监听浏览器页面是否更新
function checkVersionHandler() {
  const time = 10000; // 刷新时间间隔10s
  intervalCheckVersion(time);
}
onBeforeMount(() => {
  checkVersionHandler()
})
onBeforeUnmount(() => {
  clearInterval(intervalTime);
  intervalTime = null;
})
</script>

<template>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
