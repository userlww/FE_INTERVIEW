在上篇Vue Router简介[一]中，我们介绍了Vue Router的基本使用以及嵌套路由的使用，这篇文章我们继续将Vue Router的使用

### 编程式导航

在router实例上提供了一些API可以让我们对路由进行一些操作，下面简单介绍一下这些方法,Vue Router的这些方法都是基于浏览器的History API实现的，所以如果我们对于History API比较了解的话对于Vue Router的这些方法也是比较好理解的

#### router.push

使用push方法可以跳转到不同的路由，他会向浏览器的history栈中push一个新的记录，<router-link>组件的实现其实也是调用了这个方法，
push支持两种传参方式，我们可以简单的传一个path进来，也可以传入一个描述对象。
```js
  //直接传入路径
  router.push('/routerpush');
  //传入描述对象
  router.push({
    path: '/routerpush'
  });
  //传入命名的路由
  router.push({
    name: 'user',
    params: {
      username: 'lihua'
    }
  });
  // 结果是/user/lihua  
  //带参数的路由
  router.push({
    name: 'user',
    params: {
      username: item.name
    },
    query: {
      age: 26
    }
  });
  //结果是/user/lihua?age=26
  //带hash路由
  router.push({ path: '/about', hash: '#team' })
  //结果是/about#team
```

需要注意的是，如果同时使用了path和params，params会被忽略，因此如果我们使用params的话则最好使用name来指定对应的路由，如果我们要使用path的话，需要手写完整的路由

#### router.replace

router.replace用于替换当前路由，它与router.push不同的是，router.replace不会在history中添加新记录，相当于替换当前路径。它的传参方式和router.push相同

#### router.go

router.go接收一个整数作为参数，表示在历史栈中前进或者后退多少步

```javascript
// 向前移动一条记录，与 router.forward() 相同
router.go(1)

// 返回一条记录，与 router.back() 相同
router.go(-1)

// 前进 3 条记录
router.go(3)

// 如果没有那么多记录，静默失败
router.go(-100)
router.go(100)
```

### 命名视图

如果我们想同时同级展示多个视图，而并非嵌套展示的时候，我们可以使用命名视图

```html
<template>
  <div class="container">
    <router-view name="left"></router-view>
    <router-view></router-view>
    <router-view name="right"></router-view>
  </div>
</template>

```

```js
const routes = [
  {
    name: 'namedview',
    path: '/namedview',
    components: {
      left,
      right,
      default: middle
    }
  }
]
```
我们也可以使用类似嵌套路由的方式来使用嵌套命名视图
```js
{
  path: '/settings',
  // 你也可以在顶级路由就配置命名视图
  component: UserSettings,
  children: [{
    path: 'emails',
    component: UserEmailsSubscriptions
  }, {
    path: 'profile',
    components: {
      default: UserProfile,
      helper: UserProfilePreview
    }
  }]
}
```

### 导航守卫

导航守卫主要用来通过跳转或取消的方式对导航进行守卫，导航守卫分为全局守卫，单个路由的守卫以及组件及的守卫。

#### 全局前置守卫

使用router.beforeEach定义一个全局的前置路由守卫

```js
router.beforeEach((to, from) => {
  console.log('output->to', to);
  console.log('output->from', from);
  // return { name: 'routerpush' };
  // return false;
});
```
守卫方法接收两个参数
- to: 即将要进入的目标
- from: 当前导航要离开的路由 

这个方法可以通过 return  false来取消当前的导航，也可以通过返回路由的描述对象来执行一次路由操作，类似于router.push

#### 全局解析守卫

我们可以使用router.beforeResolve注册一个全局守卫，它是在导航被确认之前，同时在所有组件内守卫和异步路由组件解析之后，解析守卫会被调用

```js
router.beforeResolve(async to => {
  if (to.meta.requiresCamera) {
    try {
      await askForCameraPermission()
    } catch (error) {
      if (error instanceof NotAllowedError) {
        // ... 处理错误，然后取消导航
        return false
      } else {
        // 意料之外的错误，取消导航并把错误传给全局处理器
        throw error
      }
    }
  }
})
```
router.beforeResolve 是获取数据或执行任何其他操作（如果用户无法进入页面时你希望避免执行的操作）的理想位置。

#### 全局后置守卫

全局后置钩子，在导航确认之后执行。

```js
router.afterEach((to, from, failure) => {
  if (!failure) sendToAnalytics(to.fullPath)
})
```

#### 路由独享守卫

路由独享守卫可以直接定义在路由配置上。

```js
const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: (to, from) => {
      // reject the navigation
      return false
    },
  },
]
```
beforeEnter守卫只在进入路由时触发，hash、query或者hash改变时触发。

#### 组件内守卫

组件路由可以定义在组件中

- beforeRouteEnter
- beforeRouteUpdate
- beforeRouteLeave

```js
const UserDetails = {
  template: `...`,
  beforeRouteEnter(to, from) {
    // 在渲染该组件的对应路由被验证前调用
    // 不能获取组件实例 `this` ！
    // 因为当守卫执行时，组件实例还没被创建！
  },
  beforeRouteUpdate(to, from) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，
    // 由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 因为在这种情况发生的时候，组件已经挂载好了，导航守卫可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from) {
    // 在导航离开渲染该组件的对应路由时调用
    // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
  },
}
```

#### 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用 beforeRouteLeave 守卫。
3. 调用全局的 beforeEach 守卫。
4. 在重用的组件里调用 beforeRouteUpdate 守卫(2.2+)。
5. 在路由配置里调用 beforeEnter。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter。
8. 调用全局的 beforeResolve 守卫(2.5+)。
9. 导航被确认。
10. 调用全局的 afterEach 钩子。
11. 触发 DOM 更新。
11. 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。
### 参考文献

[Vue Router中文官方文档](https://router.vuejs.org/zh/)
