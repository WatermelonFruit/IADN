# react扬帆起航之路由配置与组件分割

## 本文信息
+ 本文创建于2018/03/07

## 路由
[react-router](https://github.com/ReactTraining/react-router) v4 发生了巨大改变，由静态路由开始转向动态路由，从此，就像使用普通组件一样来声明路由。其实，路由从此就是一个普通组件。

路由的按需加载的实质是代码分割,`react-router`官网有个代码拆分的[示例](https://reacttraining.com/react-router/web/guides/code-splitting)，~~是基于[bundle-loader](https://github.com/webpack-contrib/bundle-loader)实现的.~~现在官网的代码已经改为基于[react-loadable](https://github.com/jamiebuilds/react-loadable)实现。

除此之外，我们还可以通过`dynamic import`来实现代码分割，这里也是本文使用的方式。

首先，在项目根目录创建`AsyncComponent.tsx`:

```tsx
// AsyncComponent.tsx
import * as React from 'react';

interface State {
  component: any;
}

const asyncComponent = (importComponent: any) => {

  class AsyncComponent extends React.Component<{}, State> {

    constructor(props: {}) {
      super(props);

      this.state = {
        component: null,
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component
      });
    }

    render() {
      const C = this.state.component;

      return C
        ? <C {...this.props} />
        : <div>loading...</div>;
    }

  }

  return AsyncComponent;
};

export default asyncComponent;
```

然后，将需要分割的组件通过`dynamic import`引入后作为参数传递给 `asyncComponent`:

```tsx
// App.tsx
import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import asyncComponent from './AsyncComponent';
import HeaderComponent from './Header';

const App = () => {
  const AsyncHome = asyncComponent(() => import('./Home/Home'));
  const AsyncNotFound = asyncComponent(() => import('./NotFound'));

  return (
    <Router>
      <div>
        <HeaderComponent />
        <div>
          <Switch>
            <Route exact={true} path="/">
              <Redirect
                to={{
                  pathname: '/home'
                }}
              />
            </Route>
            <Route path="/home" component={AsyncHome} />
            <Route path="*" component={AsyncNotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
```

至此，我们完成了路由的按需加载。


## 基于`react-loadable`实现代码分割
按照上述方法，已经实现了代码分割。然而，`react-loadable`为我们提供了更好的解决方案。`react-loadable`核心实现原理也是通过`dynamic import`来实现组件的异步加载。在此基础上，它提供了更为强大的功能，如根据延迟时间确定是否显示loading组件、预加载、支持服务端渲染(关于与服务端渲染的搭配会在后续的文章中提到)等。

OK，现在将上述的`App.tsx`改造如下：
```tsx
// App.tsx
import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import * as Loadable from 'react-loadable';
import HeaderComponent from './Header';
import LoadingComponent from './Loading';

interface Props {
  pathname: string;
}

const AsyncHome = Loadable({
  loader: () => import(/* webpackChunkName: "homeChunk" */'./Home/Home'),
  loading: LoadingComponent,
  modules: ['homeChunk'],
  // home组件比设定的delay更长的时间加载的时候 => loading
  delay: 200, // 200ms
  // home组件比设定的timeout更长的时间加载的时候 => error
  timeout: 10000 // 10s
});

const AsyncNotFound = Loadable({
  loader: () => import(/* webpackChunkName: "notFoundChunk" */'./NotFound'),
  loading: LoadingComponent,
  modules: ['notFoundChunk'],
  delay: 200, // 200ms
  timeout: 10000 // 10s
});

const App = () => {

  return (
    <div>
      <HeaderComponent />
      <div>
        <Switch>
          <Route exact={true} path="/">
            <Redirect
              to={{
                pathname: '/home'
              }}
            />
          </Route>
          <Route path="/home" component={AsyncHome} />
          <Route path="*" component={AsyncNotFound} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
```

我们的loading组件如下：
```tsx
//Loading.tsx
import * as React from 'react';

const LoadingComponent = (props: { [key: string]: string | any }) => {
  if (props.error) {
    return <h1>Error!</h1>;
  } else if (props.timedOut) {
    return <h1>Taking a long time...</h1>;
  } else if (props.pastDelay) {
    return <h1>Loading...</h1>;
  } else {
    return null;
  }
};

export default LoadingComponent;
```

关于`react-loadable`的预加载等功能的使用这里不再介绍，它的github页面提供了详细的介绍，有兴趣的读者可以自行了解下。


至此，路由配置与组件分割的内容完毕。

***

[react扬帆启航](https://segmentfault.com/blog/react-sail)专栏分享的时我个人学习与实践react过程中的一些历程，希望借此专栏与大家共同探讨react相关的技术，以求进步。

第一期系列文章主要内容有： react的基本环境搭建、路由配置与组建分割、前后端数据交互、状态管理(mobx)、react应用部署以及同构。

第一期系列文章主要记录的是我搭建react的种子项目[react-sail](https://github.com/vdfor/react-sail)的过程。如果你觉得对你有些帮助的话，给[react-sail](https://github.com/vdfor/react-sail)个start吧，有兴趣的朋友可以一起来完善。
