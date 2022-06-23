vue-router被用于在vue项目中创建SPA(单页面应用),SPA是基于路由和组件的，路由用于设定访问路径，建立URl和页面之间的映射关系

### 前端路由

#### hash模式
在HTML5标准发布之前，大家用hash来实现路由，url hash类似于

```
http://www.xxxx.con/#/index

```

#后面哈希值发生变化之后。浏览器不会向服务器发出请求，同时会触发hash change事件，因此我们可以通过监听hashchange事件来更新页面展示的模块，


#### history模式

HTML5标准发布之后，浏览器提供了两个新的api，pushState和replaceState，通过这两个方法改变页面URL可以不向服务器发请求，同时还有一个新的事件popstate，通过监听popstate事件，配合两个改变URL但不会重新请求页面的方法，就可以用一种新的方式实现前端路由，相比较hash模式而言，地址中不会有#，因此会更加美观一些。

```
window.history.pushState(stateObject, title, URL)
window.history.replaceState(stateObject, title, URL)

window.addEventListener('popstate', e => {
  //改变页面展示
  })

```
#### Vue-router

Vue-router本身的实现要复杂的多,基于上面的两种实现设计了hash和history两种模式，需要较长的篇幅去梳理和理解具体的实现，因此后续的文章再讲
