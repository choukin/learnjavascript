 ## 安装
Koa 依赖 node _v7.6.0_ 或者 node 的更高版本提供 ES2015 和 异步函数的支持。

你可以使用你喜欢的版本管理工具快速安装支持 Koa2.0 的 Node 版本。
```shell
$ nvm install 7
$ npm i koa
$ npm my-koa-app.js
```

## 通过 Babel 使用异步方法
要在 node7.6 以下的版本环境下使用 异步方法，我们推荐你使用[ babel 的钩子](https://babeljs.io/docs/usage/babel-register/).
```js
  require('babel-core/register');
  // 在引入钩子后引入app 代码
  const app = require('./app')
```
