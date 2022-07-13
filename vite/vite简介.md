
Vite在法语中意为快速的，它是一种新型的前端构建工具，能够明显提升前端开发体验，主要由两部分构成：

- 一个开发服务器，基于原生ES模块提供了丰富的内建功能，比如速度极快的热更新HMR
- 一套构建指令，使用Rollup打包代码，并且是预配置的，可以输出用于生产环境的高度优化过的静态资源。

Vite 意在提供开箱即用的配置，同时它的 插件 API 和 JavaScript API 带来了高度的可扩展性，并有完整的类型支持。

### 初体验

使用Vite需要本地node版本大于等于v14.18.0

```
npm create vite@latest

```

使用npm 安装Vite，按照提示启动一个Vite项目，操作非常便捷。

### index.html与项目根目录

index.html是Vite项目的入口文件，这一点与webpack项目不同，Vite将index.html视为源码和模块图的一部分，解析\<script type="module" src="..."> ，这个标签指向你的 JavaScript 源码。甚至内联引入 JavaScript 的 \<script type="module"> 和引用 CSS 的\<link href>也能利用 Vite 特有的功能被解。

### 命令行

以下是使用脚手架创建的Vite项目的默认npm scripts:
```
{
  "scripts": {
    "dev": "vite", // 启动开发服务器，别名：`vite dev`，`vite serve`
    "build": "vite build", // 为生产环境构建产物
    "preview": "vite preview" // 本地预览生产构建产物
  }
}
```

### 功能

#### 模块热更新

Vite提供了一套原生的ES Moudle的 HMR API，具有模块热更新功能的框架可以利用此API提供即时准确的更新，Vite中内置了HMR到Vue单文件组件和 React Fast Refresh中，也通过 @prefresh/vite 对 Preact 实现了官方集成。

#### NPM依赖解析和与构建

```
import { someMethod } from 'my-dep'

```
在原生ES Module中，不支持像上面中的裸模块导入，Vite将会检测到所有被夹在的源文件中此类裸模块导入，执行以下操作

1. 预构建 可以提高页面加载速度，将CommonJs/UMD转换为ESM格式，这一步由esbuild执行，这使得Vite的冷启动时间比任何基于JavaScript的打包器都要快得多
2. 重写导入为合法的 URL，例如 /node_modules/.vite/deps/my-dep.js?v=f3sf2ebd 以便浏览器能够正确导入它们。

#### TypeScript支持

Vite天然支持引入.ts文件，但是它只负责ts文件的转义工作，并不进行任何类型检查。

除了TS,Vite还支持Vue、JSX、css、PostCSS、JSON等各种类型的模块的打包，具体可以参考官方文档。

### 总结

本文简单说了一下vite的使用和一些基本功能，后续深入之后会持续更新
### 参考文献

- [Vite官方指南](https://cn.vitejs.dev/guide/)
