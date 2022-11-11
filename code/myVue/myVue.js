const { callHook } = require('./lib');
class Vue {
  constructor (options) {
    this.init(options);
  }

  init (options) {
    this.initLifecycle(options);
    this.initEvents();
    this.initRender();
    callHook(this, 'beforeCreate');
    this.initInjections();
    this.initState();
    this.initProvide();
    callHook(this, 'created');
    if (options.el) {
      this.mount(options.el);
    }
  }

  // 初始化生命周期
  initLifecycle (options) {
    let parent = options.parent;
    if (parent && !options.abstract) {
      while (parent.$options.abstract && parent.parent) {
        parent = parent.$parent;
      }
      parent.$children.push(this);
    }
    this.$parent = parent;
    this.$root = parent ? parent.$root : this;
  }

  // 初始化事件
  initEvents () {
    //
  }

  // 初始化渲染
  initRender () {}

  // 初始化injections
  initInjections () {}

  // 初始化state
  initState () {}

  // 初始化provide
  initProvide () {}

  // 挂载
  mount () {}
}
