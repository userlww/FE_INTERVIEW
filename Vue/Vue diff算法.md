在上一篇文章中，我们对Vue的运行机制进行了综述，Vue运行机制综述，其中讲到了Vue的视图部分：

当数据发生变化时，触发setter通知watcher进行更新，此时会重新渲染render function生成新的虚拟DOM，与老的虚拟DOM进行patch，借助diff算法计算差异，进行视图更新。

我们今天要讲的就是Vue diff时调用的patch函数，其中的逻辑就是diff算法的核心机制。

#### patch函数

```
function patch (oldVnode, vnode) {
    // some code
    if (sameVnode(oldVnode, vnode)) {
      patchVnode(oldVnode, vnode)
    } else {
      const oEl = oldVnode.el // 当前oldVnode对应的真实元素节点
      let parentEle = api.parentNode(oEl)  // 父元素
      createEle(vnode)  // 根据Vnode生成新元素
      if (parentEle !== null) {
            api.insertBefore(parentEle, vnode.el, api.nextSibling(oEl)) // 将新元素添加进父元素
            api.removeChild(parentEle, oldVnode.el)  // 移除以前的旧元素节点
            oldVnode = null
      }
    }
    // some code 
    return vnode
}

```

以上是patch函数的主干逻辑，首先会判断两个节点是否是同一个节点，如果不同节点，则直接用新节点替换旧节点，否则调用patchVnode方法进行更深层次的比较，其中判断两个节点是不是同一个节点的逻辑是这样的

```
function sameVnode (a, b) {
  return (
    a.key === b.key &&  // key值
    a.tag === b.tag &&  // 标签名
    a.isComment === b.isComment &&  // 是否为注释节点
    // 是否都定义了data，data包含一些具体信息，例如onclick , style
    isDef(a.data) === isDef(b.data) &&  
    sameInputType(a, b) // 当标签是<input>的时候，type必须相同
  )
}
```

我们看到这段判断两个节点是否为同一个节点的代码中，判断了标签名和key属性，这也是key这个属性的关键性所在，在diff算法中，key的作用至关重要



#### patchVnode方法

```
patchVnode (oldVnode, vnode) {
    const el = vnode.el = oldVnode.el
    let i, oldCh = oldVnode.children, ch = vnode.children
    if (oldVnode === vnode) return
    if (oldVnode.text !== null && vnode.text !== null && oldVnode.text !== vnode.text) {
        api.setTextContent(el, vnode.text)
    } else {
        updateEle(el, vnode, oldVnode)
      if (oldCh && ch && oldCh !== ch) {
            updateChildren(el, oldCh, ch)
    } else if (ch){
            createEle(vnode) //create el's children dom
    } else if (oldCh){
            api.removeChildren(el)
      }
    }
}

```
这个方法里做了几件事情

- 找到对应的真实dom，即为el

- 判断Vnode和oldVnode是否指向同一个对象，如果是，那么直接return

- 如果他们都有文本节点并且不相等，那么将el的文本节点设置为Vnode的文本节点。

- 如果oldVnode有子节点而Vnode没有，则删除el的子节点

- 如果oldVnode没有子节点而Vnode有，则将Vnode的子节点真实化之后添加到el

- 如果两者都有子节点，则执行updateChildren函数比较子节点，这一步很重要



updateChildren



更新子节点的方法逻辑是这样的，首先我们会定义四个指针，分别指向新旧Vnode的第一个和最后一个节点。我们将这四个指针分别命名为newStart，newEnd，oldStart，oldEnd，分组对四个指针指向的节点进行比对，当其中的两个匹配时那么真实DOM中对应的节点就会移动到虚拟节点的响应位置：

其匹配的顺序是这样的

- newStart与oldStart

- newend与oldEnd

- newEnd与oldStart

- newStart与oldEnd



当其中一条匹配规则命中时，即两个指针指向的节点是同一个时，则比较节点内容是否一致，不一致则进行更新。同时其指针的更新规则是这样的，

下面讲到的命中指的是两者是同一个节点，判断规则同之前讲的。

- newStart与oldStart命中，将newStart和oldStart分别后移

- newEnd和oldEnd命中时，将newEnd和oldEnd分别前移

- newEnd和oldStart命中，需要将newStart对应的节点移动到旧节点未处理的节点的后面

- newStart和oldEnd命中时，需要将newStart对应的节点移动到旧节点未处理的节点的前面

如果都没有命中时，会通过循环旧节点来进行寻找，如果找到了newOld指向的节点，会将其标记为undefined。

我们会在一个循环中执行上述的匹配规则，循环结束的条件是：

```
while(newStart <= newEnd && oldStart<=oldEnd)
```
匹配结束之后newStart和newEnd之间的节点就是新增的节点，可以将其直接插入DOM中；

匹配结束时，如果循环结束的条件是newStart > newEnd,那么oldStart和oldEnd之间的节点便是需要删除的节点；

### 总结

这篇文章总结了diff算法的关键，可能读起来要读懂是比较费力的，如果是面试的时候能答到这个程度，应该是足够了
