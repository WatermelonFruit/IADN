# react扬帆起航之前后端数据交互

前后端交互是开发现代应用必不可少的内容，不同于[angular](https://angular.io)内置`HttpClientModule`，react默认并未提供用于http请求的功能。我们直接使用[fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)，但一些老旧的浏览器支持度不太好。本文中，我们推荐使用基于`Promise`的库 -- [axios](https://github.com/axios/axios)。

`axios`的基本用法非常简单，跟[jquery](http://jquery.com)的`ajax`类似。这里，主要提到两个需要注意的地方。

## 设置baseUrl
如果`restful api`至于一个单独域名之下，且支持跨域。我们可以对`axios`进行自定义配置设置`baseUrl`并封装。

```ts
// client.ts

import axios from 'axios';

axios.defaults.baseURL = 'http://api.example.com';

export default axios;
```

使用时直接调用`client.ts`即可:
```tsx
// 使用示例
import client from 'client.ts';
...
  client.get('/api/v0/test')
  .then(response => {
    // handle response
  })
  .catch(error => {
    // handle error
  });
...
```

## 开发环境下`proxy`设置
一般情况下，react在开发环境下会启动一个`dev server`，假设我们此时又启动了一个`api server`用于提供后端数据，那么就会涉及一个跨域的问题。为了解决跨域问题，我们就需要进行代理配置。具体实现方式为，在`package.json`里添加(以`api server`端口号3000为例):

```json
/* package.json */
"proxy": {
  "/api": {
    "target": "http://localhost:3000",
    "secure": "false"
  }
}
```


至此，前后端数据交互的内容完毕。

***

[react扬帆启航](https://segmentfault.com/blog/react-sail)专栏分享的时我个人学习与实践react过程中的一些历程，希望借此专栏与大家共同探讨react相关的技术，以求进步。

第一期系列文章主要内容有： react的基本环境搭建、路由配置与组建分割、前后端数据交互、状态管理(mobx)、react应用部署以及同构。

第一期系列文章主要记录的是我搭建react的种子项目[react-sail](https://github.com/vdfor/react-sail)的过程。如果你觉得对你有些帮助的话，给[react-sail](https://github.com/vdfor/react-sail)个start吧，有兴趣的朋友可以一起来完善。

