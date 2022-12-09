这篇文章整理一下webpack的使用，一些关键的概念和配置的功能及使用说明

### 简单介绍

关于webpack，其实没有必要多做介绍，这里引用一下官网对于webpack的介绍:
*本质上，webpack是一个用于现代JavaScript应用程序的静态模块打包工具。当webpack处理应用程序时，它会在内部从一个或多个入口点构建一个依赖图(dependency graph)，然后将你项目中所需的每一个模块组合成一个或多个 bundles，它们均为静态资源，用于展示你的内容。*

### 基本概念

这里通过一个简单的配置实例来介绍webpack配置中的几个关键概念以及一些可供选择的配置项，示例配置如下:

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: {
    index: {
      import: './src/index.js',
      dependOn: 'shared'
    },
    print: {
      import: './src/print.js',
      dependOn: 'shared'
    },
    shared: 'lodash'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'development'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css/i,
        use: [
          'style-loader', 'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif$)/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf$)/i,
        type: 'asset/resource'
      },
      {
        test: /\.(csv|tsv)/,
        use: ['csv-loader']
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader']
      }
    ]
  },
  devServer: {
    static: './dist'
  },
  optimization: {
    runtimeChunk: 'single'
  }
};

```
这是一个按照webpack官方的指引创建的一个入门的配置，只配置了entry、output、plugin和loader等几个入门级的配置，下面来一个一个介绍一下这些配置项

#### entry (入口)

entry指定了webpack应该使用哪个模块，作为构建起内部依赖图的开始，进入入口起点后，webpack会找出有哪些模块和库是入口起点依赖的，entry配置的默认值是'./src/index.js',我们可以配置多个入口，如图实例中所配置的

```js
{
  entry: {
    index: {
      import: './src/index.js',
      dependOn: 'shared'
    },
    print: {
      import: './src/print.js',
      dependOn: 'shared'
    },
    shared: 'lodash'
  }
}
```
在这个配置中我们用到了import和dependOn两个字段，他们的含义如下

- import: 表示启动时需要加载的模块
- dependOn: 当前入口所依赖的入口，它们必须在该入口被加载之前加载
除了这两个属性以外，还支持其他几个配置项
- filename: 指定要输出的文件名称
- library: 为当前entry创建一个library
- runtime: 运行时 chunk 的名字。如果设置了，就会创建一个新的运行时 chunk。在 webpack 5.43.0 之后可将其设为 false 以避免一个新的运行时 chunk。

有几个需要注意的地方:

1. runtime和dependOn不应该在同一个入口上同时使用，否则会抛出错误
2. runtime 不能指向已存在的入口名称
3. dependOn 不能是循环引用的

#### output (输出)

output选项用来告知webpack如何向硬盘写入编译文件，output只能指定一个

```js
 {
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath: '/'
    }
 }
```

clear:true表示每次打包之前会清空之前dist目录下的所有打包文件


#### loader

loader用于对模块的源代码进行转换，可以在加载模块时对文件进行预处理，直接将文件从不同的语言转换为JavaScript或者将内联图形转换为data url.

```js
{
  module: {
    rules: [
      {
        test: /\.css/i,
        use: [
          'style-loader', 'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif$)/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf$)/i,
        type: 'asset/resource'
      },
      {
        test: /\.(csv|tsv)/,
        use: ['csv-loader']
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader']
      }
    ]
  }
}
```
示例中的配置添加了对各种类型的静态资源文件的处理loader，可以用来处理 CSS、图片、字体等静态资源

#### plugin(插件)

插件用于解决loader无法实现的其他事情，它是webpack的支柱功能，在示例中我们使用了HtmlWebpackPlugin这个插件，用于生成和定义入口文件index.html

```js
  {
    plugins: [
      new HtmlWebpackPlugin({
        title: 'development'
      })
    ]
  }
```

### 参考文献

- [webpack中文文档](https://webpack.docschina.org/)
