# react扬帆起航之状态管理(mobx)

## 本文信息
+ 本文创建于2018/03/07
+ 2018/03/20 更新 -- 统一管理store

## mobx简介与使用
一直以来，[redux](https://redux.js.org/)是react事实上的状态管理工具，直到[mobx](https://github.com/mobxjs/mobx)横空出世。从此，多了一个选择。关于mobx与redux的异同，网上有很多文章介绍，本文中不再叙述了。本文主要介绍react与mobx搭配使用，当然，有时间我也许会写一个react与redux搭配使用的示例教程。

作为一个功能强大的状态管理工具，mobx上手确是十分简单。我们知道，redux强调单一数据来源，即单一store。然而，在大型应用时，单一store往往带来管理不便的问题。相对而言，mobx并不推崇单一store。我们可以对每一个路由组件构建一个store。当然，也可以构建一个全局的store，服务于所有组件。全局store与局部store是可以完全搭配使用的。

本文以局部store为例说明:

```tsx
// Home/Store.tsx
import { observable, action } from 'mobx';

class Store {

  // 定义数据
  @observable title: string = '';

  // 改变数据
  @action loadTitle = () => {
    this.title = 'Welcome to home page !';
  }

  // 实例化
  static init() {
    return new Store();
  }
}

export default Store;
```

```tsx
// Home/Home.tsx
import * as React from 'react';
import { observer } from 'mobx-react';
import Store from './Store';

@observer
class Home extends React.Component<{}, {}> {

  store: any;

  componentDidMount(): void {
    this.store = Store.init();
    const { loadTitle } = this.store;
    loadTitle();
  }

  render() {
    const { title } = this.store;
    return (<p>{title}</p >);
  }

}

export default Home;
```

## 统一管理store
随着应用的增大，如果在每个组件目录下建立对应的store，难免难以维护。因此，统一管理store是一个较好的选择。

在根目录下简历stores目录，作为存放store的仓库，所有的store都放在这里。

在入口文件`index.tsx`:
```tsx
// index.tsx
...
import { Provider } from 'mobx-react';
import rootStore from './stores/RootStore';
import homeStore from './stores/HomeStore';
...

const stores = {
  rootStore,
  homeStore
};

ReactDOM.render(
  <Provider {...stores}>
    <Router basename={process.env.PUBLIC_URL}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
```

在需要使用到store的组件:
```tsx
// /Home/index.tsx
...
import { observer, inject } from 'mobx-react';
import { HomeStore } from '../stores/HomeStore';
import { RootStore } from '../stores/RootStore';
...

interface Props {
  homeStore: HomeStore;
  rootStore: RootStore;
}

@inject('rootStore')
@inject('homeStore')
@observer
class HomeComponent extends React.Component<Props, {}> {
  ...
  render() {
    return (
      <div>
        <h1 className={styles.title}>{this.props.homeStore.title}</h1>
        <p>{this.props.rootStore.title}</p>
      </div>
    );
  }
}
```


这样，就完成了mobx与react的搭配使用。当然，这只是最初级的用法。mobx还有更多强大功能，想进一步了解的，可以去mobx官网查看它的文档。本文旨在介绍mobx结合react的基本用法，不做过多深入。当然，如果服务端渲染时，如何再搭配mobx，则会复杂一些。这个，我会在后面的服务端渲染的文章中提到。


至此，状态管理(mobx)的内容完毕。

***

[react扬帆启航](https://segmentfault.com/blog/react-sail)专栏分享的时我个人学习与实践react过程中的一些历程，希望借此专栏与大家共同探讨react相关的技术，以求进步。

第一期系列文章主要内容有： react的基本环境搭建、路由配置与组建分割、前后端数据交互、状态管理(mobx)、react应用部署以及同构。

第一期系列文章主要记录的是我搭建react的种子项目[react-sail](https://github.com/vdfor/react-sail)的过程。如果你觉得对你有些帮助的话，给[react-sail](https://github.com/vdfor/react-sail)个start吧，有兴趣的朋友可以一起来完善。
