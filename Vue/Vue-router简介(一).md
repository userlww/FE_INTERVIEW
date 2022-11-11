*Vue Router是Vue.js的官方路由。它与 Vue.js核心深度集成，让用Vue.js构建单页应用变得轻而易举。*

Vue Router包含以下功能

- 嵌套路由映射
- 动态路由选择
- 模块化、基于组件的路由配置
- 路由参数、查询、通配符
- 展示由 Vue.js 的过渡系统提供的过渡效果
- 细致的导航控制
- 自动激活 CSS 类的链接
- HTML5 history 模式或 hash 模式
- 可定制的滚动行为
- URL 的正确编码

### 带参数的动态路由匹配

在一些场景中，我们需要将一些符合特定规则的路由映射到相同的组件，然后通过路由上的参数来对组件进行区分，在Vue Router中可以使用动态路由参数来实现，
举例说明：我们有一个展示用户信息的User组件，路径为`user/${username}`,我们可以如下定义路由规则:
```js
import User from './components/User.vue';
const routes = [
  {
    path: '/user/:username',
    component: User
  },
  {
    path: '/user/:username/info/:sex',
    component: User
  }

];

export default routes;

```
然后在组件中，我们可以从参数上去获取这个参数

```js
<script setup>
  import { useRouter, useRoute } from 'vue-router';
  const router = useRouter();
  const route = useRoute();
  const userName = route.params.username;
  const sex = route.params.sex;
  console.error('output->', route.params);
</script>

```

这里有一个问题需要注意，当页面从/user/maxwell跳转至/user/luka时，同一个组件实例会被重复使用，因此如果我们在模板中使用了params中的参数，在组件的切换时视图中展示的对应内容不会发生变化。同样，组件的生命周期钩子不会被重复调用。

如果我们要对组件中的参数变化进行响应的话，我们可以watch $route对象上属性来实现对参数变化进行响应，也可以使用路由守卫beforeRouteUpdate去更新显示内容

### 嵌套路由

我们可以在路由配置中定义children字段来实现嵌套路由

```js
  {
    path: '/user/:username',
    component: User,
    children: [
      {
        path: 'profile',
        component: UserProfile
      }
    ]
  },
```
组件中的使用如下
```js
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

```

通过这种方式我们可以实现嵌套式的路由。

### 总结
这篇文章简单介绍了关于Vue Router的入门使用，后续我会持续更新Vue Router的进阶使用
### 参考文献

- [Vue Router中文官网](https://router.vuejs.org/zh/introduction.html)
