# react扬帆起航之基本环境搭建

## [create-react-app-typescript](https://github.com/wmonk/create-react-app-typescript)
自从使用了[Angular](https://angular.io)之后，从此入了[Typescript](https://www.typescriptlang.org)的坑。当再次选择react时，就选择了基于react官方脚手架构建工具[create-react-app](https://github.com/facebook/create-react-app)的ts实现，即[create-react-app-typescript](https://github.com/wmonk/create-react-app-typescript)。

使用起来非常简单，几个命令即可:

```bash
# create-react-app
npm i -g create-react-app
# 构建项目
create-react-app react-example --scripts-version=react-scripts-ts
# 启动
cd react-example
npm start
```

OK, done!

## [react-app-rewired](https://github.com/timarney/react-app-rewired)
[react-app-rewired](https://github.com/timarney/react-app-rewired)是一个对[create-react-app](https://github.com/facebook/create-react-app)进行自定义配置的社区解决方案，可以在不 `eject` 的情条件下对[create-react-app](https://github.com/facebook/create-react-app)进行高级配置。

```bash
npm i react-app-rewired -D
```

然后在package.json更改启动配置，更改为：
```json
/* package.json */
"scripts": {
  "start": "react-app-rewired start --scripts-version react-scripts-ts",
  "build": "react-app-rewired build --scripts-version react-scripts-ts",
  "test": "react-app-rewired test --env=jsdom --scripts-version react-scripts-ts",
}
```

然后在项目的根目录在创建 `config-overrides.js`，在这里，通过配置实现以下功能：

+ [antd](https://ant.design)按需加载以及自定义主题
+ 支持less并实现less-modules
+ 低版本浏览器自动添加css前缀

```javascript
// config-overrides.js
const tsImportPluginFactory = require('ts-import-plugin')
const { getLoader } = require("react-app-rewired");
const rewireLess = require('react-app-rewire-less');
const fs = require('fs');
const path = require('path');

module.exports = function override(config, env) {

  const tsLoader = getLoader(
    config.module.rules,
    rule =>
      rule.loader &&
      typeof rule.loader === 'string' &&
      rule.loader.includes('ts-loader')
  );

  // ts-import-plugin
  tsLoader.options = {
    getCustomTransformers: () => ({
      before: [tsImportPluginFactory({
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'true',
      })]
    })
  };

  // antd自定义主题
  config = rewireLess.withLoaderOptions({
    modifyVars: { "@primary-color": "#1DA57A" },
  })(config, env);

  // less-modules/自动添加css前缀
  config.module.rules[1].oneOf.unshift(
    {
      test: /\.less$/,
      exclude: /node_modules|antd\.less/,
      use: [
        require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: 1,
            minimize: true,
            modules: true,
            localIdentName: '[local]___[hash:base64:5]'
          }
        },
        {
          loader: require.resolve('postcss-loader'),
          options: {
            ident: 'postcss',
            plugins: () => [
              require('postcss-flexbugs-fixes'),
              autoprefixer({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9'
                ],
                flexbox: 'no-2009'
              })
            ]
          }
        },
        {
          loader: require.resolve('less-loader')
        }
      ]
    }
  );

  return config;
}
```

至此，第一部分关于基本环境搭建的内容完毕完毕。

***

react扬帆启航系列介绍的是我搭建react的种子项目的过程，如果你觉得对你有些帮助的话，给[react-sail](https://github.com/vdfor/react-sail)个start吧，有兴趣的朋友可以一起来完善。
