
首先概述一下打包经历的几个过程

- 解析入口文件，获取AST抽象语法树
- 找到所有的依赖模块
- 将AST转换为code
- 递归解析所有依赖项,生成依赖关系图
- 重写 require 函数,输出 bundle

####  解析入口文件，获取AST

我们要讲import这种模块导入的语法转换为普通的JavaScript代码，可以借助一个js库来完成AST语法树的转换，webpack中使用的转换AST的库是acorn，webpack自己实现了一个JavascriptParser类，这个类里面用到了acorn。这里借助大家更熟悉的babel来表达一下转换AST这一步

```
const fs = require("fs");
const parser = require("@babel/parser");

const config = require("../webpack.config"); // 引入配置文件

// 读取入口文件
const fileContent = fs.readFileSync(config.entry, "utf-8");

// 使用babel parser解析AST
const ast = parser.parse(fileContent, { sourceType: "module" });

```

#### 找到所有的依赖模块

遍历所有的import模块，存入dependecies
```
 function getDependecies(ast, filename) => {
    const dependecies = {}
    // 遍历所有的 import 模块,存入dependecies
    traverse(ast, {
      // 类型为 ImportDeclaration 的 AST 节点 (即为import 语句)
      ImportDeclaration({ node }) {
        const dirname = path.dirname(filename)
        // 保存依赖模块路径,之后生成依赖关系图需要用到
        const filepath = './' + path.join(dirname, node.source.value)
        dependecies[node.source.value] = filepath
      }
    })
    return dependecies
  }


```

#### AST转换为code

```
function getCode (ast) {
    // AST转换为code
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    })
    return code
  }

```

####  递归解析所有依赖项,生成依赖关系图

```
const dependencyGraph = this.modules.reduce(
      (graph, item) => ({
        ...graph,
        // 使用文件路径作为每个模块的唯一标识符,保存对应模块的依赖对象和文件内容
        [item.filename]: {
          dependecies: item.dependecies,
          code: item.code
        }
      }),
      {}
    )
```
#### 重写require，生成bundle文件

```
 // 重写 require函数 (浏览器不能识别commonjs语法),输出bundle
  generate(code) {
    // 输出文件路径
    const filePath = path.join(this.output.path, this.output.filename)
    // 懵逼了吗? 没事,下一节我们捋一捋
    const bundle = `(function(graph){
      function require(module){
        function localRequire(relativePath){
          return require(graph[module].dependecies[relativePath])
        }
        var exports = {};
        (function(require,exports,code){
          eval(code)
        })(localRequire,exports,graph[module].code);
        return exports;
      }
      require('${this.entry}')
    })(${JSON.stringify(code)})`

    // 把文件内容写入到文件系统
    fs.writeFileSync(filePath, bundle, 'utf-8')
  }

```

### 总结

本文是一篇水文，主要讲了webpack打包原理中经历的几个关键阶段，代码示例来自参考文档第一篇，我将每一步的核心代码进行了提取，以便大家参考，如果要了解详细过程，可以查看原作者的文章
### 参考文档
- [webpack打包原理 ? 看完这篇你就懂了 !](https://juejin.cn/post/6844904038543130637#heading-13)
- [手写一个webpack，看看AST怎么用](https://segmentfault.com/a/1190000039231950)
