本文续上篇[webpack使用笔记](./webpack%E4%BD%BF%E7%94%A8%E7%AC%94%E8%AE%B0.md)，继续讲webpack实际使用过程中需要用到的一些关键技术和工具

### 缓存

在web开发中，缓存的重要性不言而喻，客户端(浏览器)的缓存机制，如果文件名没有发生变化的话，多次访问资源时除了第一次请求以外后续的请求都会命中缓存，因此当我们修改了源文件的内容，使用webpack构建出来的bundle文件的名称也需要相对应的发生变化，而当我们的源文件没有做任何修改的时候，我们期望重复打包时文件名称则不发生变化，因为打包出来的bundle文件也没有变化。

我们可以在output.filename来定义输出的文件的名称，使用substitution(可替换模板字符串) ，我们可以使用[contenthash],它会根据文件内容来创建唯一的hash，当资源内容发生变化时，[contenthash]也会发生变化。

示例

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
      title: 'Caching',
    }),
  ],
  output: {
    filename: 'bundle.js',
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    moduleIds: 'deterministic', //模块标识符
    runtimeChunk: 'single', //将runtime代码拆分为一个单独的chunk
    splitChunks: {
      cacheGroups: {   //将第三方库提取到单独的 vendor chunk中 
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
     },
    }
};
```

在这个示例中我们需要关注几个关键的配置

- output.filename: '[name].[contenthash].js': 输出的bundle文件的名称，由源文件名称+唯一hash构成
- optimization.runtimeChunk: 'single': 将runtime代码拆分为一个单独的chunk。
- optimization.splitChunks.cacheGroups: 将第三方库比如lodash和React等提取到单独的vendor chunk文件中
- optimization.moduleIds: 值为:'deterministic', 定义计算模块ID的算法

### 环境变量

通常情况下，我们在开发环境和生产环境的打包配置是不一样的，我们需要通过一个环境变量来告知配置文件当前的环境，来区分不同的配置，支持环境变量我们需要做两件事情。

#### 打包命令

打包命令行配置 --env参数，我们可以传入任意个数的环境变量，举例

```js
npx webpack --env goal=local --env production --progress
```

#### 配置文件

我们要使用环境变量，配置文件需要输出一个函数而非一个对象

```js
//webpack.config.js
const path = require('path');

module.exports = (env) => {
  // Use env.<YOUR VARIABLE> here:
  console.log('Goal: ', env.goal); // 'local'
  console.log('Production: ', env.production); // true

  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
};
```
### 生产环境配置

通常情况下，生产环境和开发环境的配置有比较大的差异，但是对于资源文件的处理，很大程度上还是相同的，因此我们在通过环境变量区分不同的模式的同时，还需要借助webpack-merge这个工具来对不同环境的差异配置和公共的基础配置进行一个合并。

然后我们创建几个配置文件，首先是基础的公共配置webpack.base.js
```js
 // webpack.base.js
 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
   entry: {
     app: './src/index.js',
   },
   plugins: [
     new HtmlWebpackPlugin({
       title: 'Production',
     }),
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
     clean: true,
   },
  };
```
然后是开发环境和生产环境的各自的自定义配置,

```js
 //webpack.dev.js
 const { merge } = require('webpack-merge');
 const common = require('./webpack.common.js');

 module.exports = merge(common, {
   mode: 'development',
   devtool: 'inline-source-map',
   devServer: {
     static: './dist',
   },
 });
```

```js
 //webpack.prod.js
 const { merge } = require('webpack-merge');
 const common = require('./webpack.common.js');

 module.exports = merge(common, {
   mode: 'production',
 });
```

如示例中所写,我们使用merge()功能，将公共配置和不同环境的差异性配置进行合并，我们可以在package.json中添加对应的构建脚本

```js
//package.json
{
  "scripts": {
    "start": "webpack serve --open",
    "start": "webpack serve --open --config webpack.dev.js",
    "build": "webpack"
    "build": "webpack --config webpack.prod.js"
  }
}
```

### 参考文献

[webpack中文文档](https://webpack.docschina.org/guides/production/#specify-the-mode)
