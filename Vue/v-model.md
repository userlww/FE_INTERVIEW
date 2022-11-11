v-model使用在表单元素\<input>、\<textarea>以及\<select>元素上创建双向绑定，本质上它只是一个语法糖，负责监听用户的输入事件以更新数据，并对一些极端场景进行特殊处理

在Vue中，很多人会因为Vue支持双向绑定，从而误以为Vue中的数据流向是双向的，事实上Vue是单向数据流，所谓的v-model双向绑定只是一个语法糖，举一个简单的示例
```javascript
let vm = new Vue({
  el: '#app',
  template: '<div>'
  + '<input v-model="message" placeholder="edit me">' +
  '<p>Message is: {{ message }}</p>' +
  '</div>',
  data() {
    return {
      message: ''
    }
  }
})
```
这是一个最简单的示例，我们给input元素设置了v-model属性，绑定了变量message，让我们在输入框输入内容时，变量message的值也会变化，在了解了如何使用之后，我们可以借助源码来简单分析一下v-model的实现原理

### 原理分析

我们给input元素指定了v-model指令之后，首先会在模板编译阶段对指令进行解析，v-model会被作为普通指令解析到el.directives，然后在对指令进行解析的时候，会对v-model这个指令进行处理，对应的逻辑在src/platforms/web/compiler/directives/model.js中

```js
export default function model (
  el: ASTElement,
  dir: ASTDirective,
  _warn: Function
): ?boolean {
  warn = _warn
  const value = dir.value
  const modifiers = dir.modifiers
  const tag = el.tag
  const type = el.attrsMap.type

  if (process.env.NODE_ENV !== 'production') {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn(
        `<${el.tag} v-model="${value}" type="file">:\n` +
        `File inputs are read only. Use a v-on:change listener instead.`
      )
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers)
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers)
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers)
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers)
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers)
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers)
    // component v-model doesn't need extra runtime
    return false
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      `<${el.tag} v-model="${value}">: ` +
      `v-model is not supported on this element type. ` +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    )
  }

  // ensure runtime directive metadata
  return true
}
```

看一下这段代码，它的核心逻辑是这样的
1. 如果是input type=file,这种情况输入框的value值是只读的，因此会进行警告，建议使用v-on:change做监听
2. 跟进不同的标签名和不同的控件类型执行不同的绑定逻辑

然后我们再以输入框为例来简单分析下v-model的具体实现

```js
const { lazy, number, trim } = modifiers || {}
const needCompositionGuard = !lazy && type !== 'range'
const event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input'
let valueExpression = '$event.target.value'
  if (trim) {
    valueExpression = `$event.target.value.trim()`
  }
  if (number) {
    valueExpression = `_n(${valueExpression})`
  }

  let code = genAssignmentCode(value, valueExpression)
  if (needCompositionGuard) {
    code = `if($event.target.composing)return;${code}`
  }

  addProp(el, 'value', `(${value})`)
  addHandler(el, event, code, null, true)
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()')
  }
```

这其中最关键的代码是
```js
  addProp(el, 'value', `(${value})`)
  addHandler(el, event, code, null, true)
```
addProp方法通过给input元素绑定了一个props属性，使得我们的变量更新时可以实时更新输入框中的内容，而addHandler方法则是通过监听input事件，使得输入框内容更新时变量值可以实时更新。


### 总结

v-model的实现原理，其实就是通过监听用户的输入或者选择事件，更新组件实例中的变量值

### 参考

- [Vue.js 技术揭秘](https://ustbhuangyi.github.io/vue-analysis/v2/extend/v-model.html#%E8%A1%A8%E5%8D%95%E5%85%83%E7%B4%A0)
