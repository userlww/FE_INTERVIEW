"Vuex是一个专为Vue.js应用程序开发的状态管理**模式+库**，它采用集中式存储管理应用多的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化"

我们知道Vue是单向数据流，下图是一个对“单向数据流”的简单示意图
![单向数据流](./../images/flow.png)

图中几部分的代表的是这样的

- State：状态，是驱动应用的数据源
- View：视图，以声明的方式将状态映射到视图
- Action: 操作，响应视图上用户输入导致的状态变化

图中比较清晰的表达了状态、视图、以及操作之间的关系，用户操作视图出发对应的操作，操作引起状态变化，状态变化通过和视图的绑定关系提现到视图上面。
但是当我们的应用变的复杂，需要多个组件共享状态时，单向数据流的间接性很容易被破坏，因为我们经常会遇到多个视图依赖于同一个状态，以及多个视图的操作会需要变更同一个状态。

为了解决这个问题，Vue设计了一个全局的单例模式来进行管理，在这个单例模式之下，组件树构成一个巨大的视图，都可以获取到状态或者触发响应行为，当然对于Vue应用来说，Vuex并不是必须的，Vuex适用于构建中大型单页应用，当我们需要考虑如何在组件外部妥善的管理组件状态时，Vuex是一个很好的选择。

### 简单使用实例

```js
import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'

import './assets/main.css'

const store = createStore({
  state() {
    return {
      count:0
    }
  },
  mutations:{
    increament(){
      state.count++
    }
  }
})

const app = createApp(App);
app.use(store);

```

### 核心概念介绍

#### State

Vuex使用单一状态树，一个对象包含了全部的应用层级状态，每个应用仅仅包含一个store实例，我们能够直接定位任一特定的状态片段，在调试过程中也能轻易的获取当前应用状态的快照，在组件中使用时，我们可以将state中的字段声明为计算属性，当state中的字段发生变化的时候，都会重新求值计算属性，并且触发更新相关联的DOM。

如果我们的组件依赖多个state中的字段，可以借助mapState函数进行结构，简化写法，示例:

```js
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```

#### getter

很多时候我们不是直接使用state中字段的原始值，而是对其进行计算之后的结果，这种情况我们可以在组件本身的计算属性定义中处理，但是如果多个组件都要使用这个属性的话，在多个组件中重复计算显然是不合理的，这种情况下我们可以给store中定义getter，示例

```js
const store = createStore({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos (state) {
      return state.todos.filter(todo => todo.done)
    }
  }
})

//使用
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}

//可以通过让getter返回一个函数来，来实现给getter传入自定义参数
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}

```

同样我们也可以用mapGetts辅助函数来将getter映射到计算属性

```js
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}

```

#### Mutation

Mutation是在Vuex中更改状态的唯一方式，通过store.commit方法触发mutation来实现状态更新。

```js

const store = createStore({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})


//使用

store.commit('increment')

//传参，第二个参数通常应该是一个对象

store.commit('increment', 10)


```

通常我们应该以对象的方式提交Mutation

```js
store.commit({
  type: 'increment',
  amount: 10
})

```

需要注意的是，Mutation必须是同步函数，因为它会同时在多个组件中被同时调用，如果在异步操作的回调中更新state的话会使得状态本身变得无法追踪


#### Action

Action和mutation类似，不同之处在于

1. Action提交的事mutation，而不是直接变更状态
2. Action可以包含任意的异步操作

Action通过store来进行触发，举例说明

```js
actions: {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}

store.dispatch('incrementAsync', {
  amount: 10
})

//
```

我们也可以使用mapAction辅助函数来在组件的methods方法中建立映射

```js
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```

#### Module

我们可以将store分割成模块。每个模块拥有自己的state、Getter、Mutation和Action吗，支持模块，使得我们的状态树不至于变得过分臃肿
### 参考文献

- [Vuex中文官网](https://vuex.vuejs.org/zh/)
