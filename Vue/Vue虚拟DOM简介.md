**虚拟DOM简单来说就是用一个JavaScript对象来完整的描述一个DOM节点**,这个JavaScript对象就是真实DOM节点的虚拟DOM节点
```
<div class="element" id="block">content</div>

{
  tag: 'div',  //标签名
  attrs: {     // 属性
    class: 'element',
    id: 'block'
  },
  text: 'content',  //文本内容
  children:[] //子节点
}
```
### 为什么要使用虚拟DOM

在Vue官方团队成员霍春阳所作的《Vue.js设计与实现》一书中，有这样一句话：*“虚拟DOM的意义就在于使找出差异的性能消耗最小化”*，直接操作DOM的性能开销是庞大的，但是即便是使用虚拟DOM，最终还是要改变真实DOM，也就是说必要的DOM操作是不可避免的，而虚拟DOM则通过它的diff算法使得DOM的更新范围尽可能变小，降低了真实DOM操作的性能开销，同时通过框架的封装给开发者提供了一种更友好的声明式的前端开发方式。

### Vue中的虚拟DOM

Vue中定义了一个VNode类，通过这个类可以实例化虚拟DOM节点，源码如下：
```
  // 源码位置：src/core/vdom/vnode.js

export default class VNode {
  constructor (
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions,
    asyncFactory?: Function
  ) {
    this.tag = tag                                /*当前节点的标签名*/
    this.data = data        /*当前节点对应的对象，包含了具体的一些数据信息，是一个VNodeData类型，可以参考VNodeData类型中的数据信息*/
    this.children = children  /*当前节点的子节点，是一个数组*/
    this.text = text     /*当前节点的文本*/
    this.elm = elm       /*当前虚拟节点对应的真实dom节点*/
    this.ns = undefined            /*当前节点的名字空间*/
    this.context = context          /*当前组件节点对应的Vue实例*/
    this.fnContext = undefined       /*函数式组件对应的Vue实例*/
    this.fnOptions = undefined
    this.fnScopeId = undefined
    this.key = data && data.key           /*节点的key属性，被当作节点的标志，用以优化*/
    this.componentOptions = componentOptions   /*组件的option选项*/
    this.componentInstance = undefined       /*当前节点对应的组件的实例*/
    this.parent = undefined           /*当前节点的父节点*/
    this.raw = false         /*简而言之就是是否为原生HTML或只是普通文本，innerHTML的时候为true，textContent的时候为false*/
    this.isStatic = false         /*静态节点标志*/
    this.isRootInsert = true      /*是否作为跟节点插入*/
    this.isComment = false             /*是否为注释节点*/
    this.isCloned = false           /*是否为克隆节点*/
    this.isOnce = false                /*是否有v-once指令*/
    this.asyncFactory = asyncFactory
    this.asyncMeta = undefined
    this.isAsyncPlaceholder = false
  }

  get child (): Component | void {
    return this.componentInstance
  }
}
```

VNode类中包含了描述一个真实DOM节点所需要的一系列属性，通过属性的不同搭配，可以描述各种类型的DOM节点。

### VNode类型
Vue中的虚拟节点包含以下几种类型

1. 注释节点

注释节点只有两个属性，text表示具体的注释信息，isComment标识是不是注释节点
```
// 创建注释节点
export const createEmptyVNode = (text: string = '') => {
  const node = new VNode()
  node.text = text
  node.isComment = true
  return node
}
```
2. 文本节点

文本节点更为简单，只有一个text属性

```
// 创建文本节点
export function createTextVNode (val: string | number) {
  return new VNode(undefined, undefined, undefined, String(val))
}
```
3. 克隆节点

克隆节点是将一个已经存在的节点克隆出来，在模板编译优化的时候会用到
```
// 创建克隆节点
export function cloneVNode (vnode: VNode): VNode {
  const cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  )
  cloned.ns = vnode.ns
  cloned.isStatic = vnode.isStatic
  cloned.key = vnode.key
  cloned.isComment = vnode.isComment
  cloned.fnContext = vnode.fnContext
  cloned.fnOptions = vnode.fnOptions
  cloned.fnScopeId = vnode.fnScopeId
  cloned.asyncMeta = vnode.asyncMeta
  cloned.isCloned = true
  return cloned
}
```
4. 元素节点

元素节点和我们就是我们示例中写到的DIV的节点类型，包含了标签名，属性名，内容，子节点等属性。
5. 组件节点

组件节点具有元素节点的全部属性之外，还具有两个特殊的属性
- componentOptions :组件的option选项，如组件的props等
- componentInstance :当前组件节点对应的Vue实例

6. 函数式组件节点
   函数式组件节在组件节点之上又多了两个节点：
- fnContext:函数式组件对应的Vue实例
- fnOptions: 组件的option选项

### VNode使用

在视图渲染之前，先把template编译成VNode并缓存，等数据发生变化页面需要重新渲染的时候，把数据变化之后的VNode与之前缓存的VNode对比出差异，然后有差异的VNode对应的真实DOM节点就是需要重新渲染的节点，最后根据有差异的VNode创建出真实的DOM节点再插入到视图中，最终完成一次视图更新。


### 参考文献
- [Vue源码系列-Vue中文社区](https://vue-js.com/learn-vue/)
