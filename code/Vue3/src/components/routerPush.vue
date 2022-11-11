<script setup>
  import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';
  onBeforeRouteLeave((to, from) => {
    console.log('output-to', to);
    console.log('output->', from);
    alert('组件独有导航守卫出发');
  });
</script>
<template>
  <div class="content">我是通过router.push打开的</div>
</template>
<style scoped>
</style>
