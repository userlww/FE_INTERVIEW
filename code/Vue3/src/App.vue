<script setup>
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const userName = 'Maxwell';
function clickBtn () {
  // router.push({
  //   path: '/routerpush'
  // });
  router.push('/routerpush');
}
function goPerson (item) {
  // router.push({
  //   path: `/user/${item.name}`
  // });
  router.push({
    name: 'user',
    params: {
      username: item.name
    },
    query: {
      age: 26
    }
  });
}

function goNamedView () {
  router.push({
    path: '/namedview'
  });
}
const userList = [
  { name: 'lihua', sex: 'girl' },
  { name: 'lukadoncic', sex: 'boy' }
];
</script>

<template>
  <div>
    <div class="title">router-link点击跳转</div>
    <router-link to="/routerlink">点我尝试路由跳转</router-link>
    <div class="title">router.push跳转</div>
    <div @click="clickBtn" class="link">点我尝试路由push跳转</div>
    <div class="title">命名视图</div>
    <div class="link-blue" @click="goNamedView">命名视图跳转</div>
    <div class="title">用户列表</div>
    <li v-for="item in userList" :key="item.name" @click="goPerson(item)">{{item.name}}</li>
    <div class="title">下面的方框内显示路由组件内容</div>
    <div class="block">
      <router-view class="router-container"></router-view>
    </div>
 </div>
</template>

<style scoped>
.title {
  padding: 20px 0 10px;
  font-weight: 600;
}
.block {
  min-width: 300px;
  min-height: 500px;
  border: #DCDCDC 1px solid;
  padding: 20px;
}
.link {
  color: red;
}
.link-blue {
  color: skyblue;
}
</style>
