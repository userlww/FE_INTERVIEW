<template>
  <div>
    <div >姓名:{{userName}}</div>
    <div>性别:{{sex}}</div>
    <div class="link" @click="goProfile">查看详细信息</div>
    <div class="title">嵌套路由展示用户详细信息</div>
    <div class="container">
      <router-view></router-view>
    </div>

  </div>
</template>
<script setup>
  import { useRouter, useRoute } from 'vue-router';
  const router = useRouter();
  const route = useRoute();
  const userName = route.params.username;
  const sex = route.params.sex;

  function goProfile () {
    router.push({
      path: `${userName}/profile`
    });
  }
</script>

<style scoped>
  .container {
    border: 15px;
    border: 1px solid #8f1919;
    width: 500px;
    height: 600px;
    box-sizing: border-box;
    padding: 20px;
  }
  .title {
    padding: 10px 0;
    font-weight: 600;
  }
</style>
