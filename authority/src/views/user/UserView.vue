<!--
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2023-08-03 23:05:59
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-06 14:31:16
 * @FilePath: \Front-end\Vue\Vue3\demo\authority\src\views\user\UserView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
</script>
<template>
  <div class="about">
    <h1>user is {{ route.params.id }}</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
