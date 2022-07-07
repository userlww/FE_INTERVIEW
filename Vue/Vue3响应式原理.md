Vue3在实现上使用Proxy代替了Vue2中的Object.defineProperty,解决了Vue2的响应式系统中的一些缺陷，比如：
- 对属性添加和删除动作的监听
- 对数组基于下标的修改、对于.length修改的检测
- 对Map、Set、WeakMap 和 WeakSet 的支持

### Proxy

Proxy属于“元编程”，它相当于在目标对象上架设一层代理，当外界访问该对象的时候，必须先通过这层代理，那么就可以监听到对对象的访问和操作，借助这一点，可以去构建Vue3的响应式系统，举例简单说明
```
const obj = {
  a:'test'
}
const proxyIns = new Proxy(obj,{
  get: function(target, key, receiver) {
    console.log('target',target);
    console.log('key',key);
    console.log('receiver',receiver);
    return Reflect.get(target,key,receiver)
  },
  set: function(target,key,value,receiver) {
    console.log('target',target);
    console.log('key',key);
    console.log('value',value);
    console.log('receiver',receiver);
  }
})

proxyIns.a;
proxyIns.a = 'bbbbb';

```

### Vue3如何建立响应式

 我们可以运用 composition-api 中的 reactive 直接构建响应式，composition-api 的出现我们可以在.vue文件中，直接用 setup() 函数来处理之前的大部分逻辑，也就是说我们没有必要在 export default{ } 中在声明生命周期 ， data(){} 、watch{} 、 computed{} 等 ，取而代之的是我们在 setup 函数中，用 reactive、 watch 等 生命周期 api 来到达同样的效果，提升代码的复用率，逻辑性更强。

```
const { reactive , onMounted } = Vue
setup(){
    const state = reactive({
        count:0,
        todoList:[]
    })
    /* 生命周期mounted */
    onMounted(() => {
       console.log('mounted')
    })
    /* 增加count数量 */
    function add(){
        state.count++
    }
    /* 减少count数量 */
    function del(){
        state.count--
    }
    /* 添加代办事项 */
    function addTodo(id,title,content){
        state.todoList.push({
            id,
            title,
            content,
            done:false
        })
    }
    /* 完成代办事项 */
    function complete(id){
        for(let i = 0; i< state.todoList.length; i++){
            const currentTodo = state.todoList[i]
            if(id === currentTodo.id){
                state.todoList[i] = {
                    ...currentTodo,
                    done:true
                }
                break
            }
        }
    }
    return {
        state,
        add,
        del,
        addTodo,
        complete
    }
}
```
同时vue3没有放弃对vue2写法的支持，对vue2.x的写法是完全兼容的，提供了applyOptions 来处理options形式的vue组件。但是options里面的data,watch,computed等处理逻辑，还是用了composition-api中的API对应处理。

```
export default {
    data(){
        return{
            count:0,
            todoList:[]
        }
    },
    mounted(){
        console.log('mounted')
    }
    methods:{
        add(){
            this.count++
        },
        del(){
            this.count--
        },
        addTodo(id,title,content){
           this.todoList.push({
               id,
               title,
               content,
               done:false
           })
        },
        complete(id){
            for(let i = 0; i< this.todoList.length; i++){
                const currentTodo = this.todoList[i]
                if(id === currentTodo.id){
                    this.todoList[i] = {
                        ...currentTodo,
                        done:true
                    }
                    break
                }
            }
        }
    }
}
```

### 原理浅析

**Effect:副作用函数 => 新的渲染watcher**

Vue3通过一个副作用函数(effect)来跟踪当前正在运行的方法。它一个函数的包裹器，在函数被调用之前就启动跟踪。Vue 知道哪个副作用函数在何时运行，并能在需要时再次执行它，我们需要的是一个能够包裹总和的东西：
```
createEffect(() => {
  sum = val1 + val2
})
```
我们需要 createEffect 来跟踪和执行。我们的实现如下：

```
// 维持一个执行副作用的栈
const runningEffects = []
const createEffect = fn => {
  // 将传来的 fn 包裹在一个副作用函数中
  const effect = () => {
    runningEffects.push(effect)
    fn()
    runningEffects.pop()
  }
  // 立即自动执行副作用
  effect()
}
```
当我们的副作用被调用时,在调用fn之前，它会把自己推到runningEffects数组中。这个数组可以用来检查当前正在运行副作用。
副作用是许多关键功能的起点。例如，组件的渲染和计算属性都在内部使用副作用。任何时候，只要有东西对数据变化做出奇妙的回应，你就可以肯定它已经被包裹在一个副作用中了。

#### 初始化mountComponent

```
// 初始化组件
const mountComponent: MountComponentFn = (
  initialVNode,
  container,
  anchor,
  parentComponent,
  parentSuspense,
  isSVG,
  optimized
) => {
  /* 第一步: 创建component 实例   */
  const instance: ComponentInternalInstance = (initialVNode.component = createComponentInstance(
    initialVNode,
    parentComponent,
    parentSuspense
  ))
  /* 第二步 ： TODO:初始化 初始化组件,建立proxy , 根据字符串模版得到 */
  setupComponent(instance)
  /* 第三步：建立一个渲染effect，执行effect */
  setupRenderEffect(
    instance,     // 组件实例
    initialVNode, //vnode 
    container,    // 容器元素
    anchor,
    parentSuspense,
    isSVG,
    optimized
  )  
}
```
 
上面是整个mountComponent的主要分为了三步:
 - 创建component 实例
 - 初始化组件，建立proxy，根据字符串模版得到render函数。生命周期钩子函数处理等等
 - 建立一个渲染effect，执行effect。
从如上方法中我们可以看到，在setupComponent已经构建了响应式对象，但是还没有初始化收集依赖，

#### setupRenderEffect 构建渲染effect

```
const setupRenderEffect: SetupRenderEffectFn = (
  instance,
  initialVNode,
  container,
  anchor,
  parentSuspense,
  isSVG,
  optimized
) => {
  /* 创建一个渲染 effect */
  instance.update = effect(function componentEffect() {
    //...
  },{ scheduler: queueJob })
}
```
effect做了些什么

```
export function effect<T = any>(
  fn: () => T,
  options: ReactiveEffectOptions = EMPTY_OBJ
): ReactiveEffect<T> {
  const effect = createReactiveEffect(fn, options)
  /* 如果不是懒加载 立即执行 effect函数 */
  if (!options.lazy) {
    effect()
  }
  return effect
}
```
- 首先调用createReactiveEffect,
- 如果不是懒加载,立即执行由createReactiveEffect创建出来的ReactiveEffect函数

#### ReactiveEffect

```
function createReactiveEffect<T = any>(
  fn: (...args: any[]) => T, /**回调函数 */
  options: ReactiveEffectOptions
): ReactiveEffect<T> {
  const effect = function reactiveEffect(...args: unknown[]): unknown {
    try {
        enableTracking()
        effectStack.push(effect) //往effect数组中里放入当前 effect
        activeEffect = effect //TODO: effect 赋值给当前的 activeEffect
        return fn(...args) //TODO:    fn 为effect传进来 componentEffect
      } finally {
        effectStack.pop() //完成依赖收集后从effect数组删掉这个 effect
        resetTracking()
        /* 将activeEffect还原到之前的effect */
        activeEffect = effectStack[effectStack.length - 1]
    }
  } as ReactiveEffect
  /* 配置一下初始化参数 */
  effect.id = uid++
  effect._isEffect = true
  effect.active = true
  effect.raw = fn
  effect.deps = [] /* TODO:用于收集相关依赖 */
  effect.options = options
  return effect
}
```
 

整个流程
- setupComponent创建组件，调用composition-api，处理options（构建响应式）得到Observer对象。
- 创建一个渲染effect，里面包装了真正的渲染方法componentEffect，添加一些effect初始化属性。
- 然后立即执行effect，然后将当前渲染effect赋值给activeEffect

#### 依赖收集

**track => 依赖收集器（订阅）**

里面主要引入了两个概念 targetMap 和 depsMap,targetMap 键值对 { target : depsMap }， target : 源数据对象，depsMap：为存放依赖dep的 map 映射。depsMap 键值对 { key : deps }， key：当前get访问的属性名，deps 存放effect的Set数据类型。

我们知道track作用大致是，首先根据 proxy对象，获取存放deps的depsMap，然后通过访问的属性名key获取对应的dep,然后将当前激活的effect存入当前dep收集依赖。

主要作用：
- 找到与当前target和key对应的dep。
- dep与当前activeEffect建立联系，收集依赖。

**trigger => 派发更新（发布）**
 
```
/* 根据value值的改变，从effect和computer拿出对应的callback ，然后依次执行 */
export function trigger(
  target: object,
  type: TriggerOpTypes,
  key?: unknown,
  newValue?: unknown,
  oldValue?: unknown,
  oldTarget?: Map<unknown, unknown> | Set<unknown>
) {
  /* 获取depssMap */
  const depsMap = targetMap.get(target)
  /* 没有经过依赖收集的 ，直接返回 */
  if (!depsMap) {
    return
  }
  const effects = new Set<ReactiveEffect>()        /* effect钩子队列 */
  const computedRunners = new Set<ReactiveEffect>() /* 计算属性队列 */
  const add = (effectsToAdd: Set<ReactiveEffect> | undefined) => {
    if (effectsToAdd) {
      effectsToAdd.forEach(effect => {
        if (effect !== activeEffect || !shouldTrack) {
          if (effect.options.computed) { /* 处理computed逻辑 */
            computedRunners.add(effect)  /* 储存对应的dep */
          } else {
            effects.add(effect)  /* 储存对应的dep */
          }
        }
      })
    }
  }
  add(depsMap.get(key))
  const run = (effect: ReactiveEffect) => {
    if (effect.options.scheduler) { /* 放进 scheduler 调度*/
      effect.options.scheduler(effect)
    } else {
      effect() /* 不存在调度情况，直接执行effect */
    }
  }
  //TODO: 必须首先运行计算属性的更新，以便计算的getter
  //在任何依赖于它们的正常更新effect运行之前，都可能失效。
  computedRunners.forEach(run) /* 依次执行computedRunners 回调*/
  effects.forEach(run) /* 依次执行 effect 回调（ TODO: 里面包括渲染effect ）*/
}
```

- 首先从targetMap中，根据当前proxy找到与之对应的depsMap。
- 根据key找到depsMap中对应的deps，然后通过add方法分离出对应的effect回调函数和computed回调函数。
- 依次执行computedRunners 和 effects 队列里面的回调函数，如果发现需要调度处理,放进scheduler事件调度。





### 参考文献

- [vue3.0 响应式原理(超详细)](https://juejin.cn/post/6858899262596448270#heading-12)
- [ES6 入门教程](https://es6.ruanyifeng.com/#docs/proxy)
