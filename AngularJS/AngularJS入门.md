# AngularJS入门
      
## AngularJS与Angular之间的关系
+ 通常意义上，AngularJS指的Angular(1.x)；Angular指的是Angular(2+)
+ AngularJS与Angular完全不兼容
 
## 核心特点
### MVVM
+ 社区一直将AngularJS统称为前端MVC框架，但实际上AngularJS整体上更接近MVVM模式
+ MVC：Model-View-Control(模型-视图-控制器)，view指的是视图；model指的是实体模型；control指的是控制器，用于控制model与view之间的交互
+ MVVM：Model-View-ViewModel(模型-视图-视图模型)
    + 以数据绑定为基础架构
    + view和model分离，viewModel负责完成view于model间的交互,负责业务逻辑
    + view的变动，自动反映在viewModel；反之亦然
### 双向绑定
+ 从界面的操作能实时反映到数据
+ 数据的变更能实时展现到界面
### 依赖注入
### 模块化
+ 隔离命名空间--AngularJS没有暴露在Global的对象（angular对象本身除外）
+ 处理依赖关系--AngularJS的模块指定依赖关系
+ 模块--定义一个App
    + 模块先定义（angular.module），再使用
    + 不限制模块定义的顺序
    + 不限制各个service、controller、directive注册到模块的顺序
### 语义化标签

## $scope（scope）作用域
+ controller的 scope称之为作用域
+ 凡是在html中用到的变量/函数都必须定义在 scope 上的
+ 定义在 scope 上的变量/函数，都是全局的
+ 一般来说，变量的作用范围越小越好；因此，对于在html中用不到的变量/函数，最好不要定义在scope上
      
## 分层
+ 开发时，建议将Controller层与Service层进行分离。也就说，将数据交互与处理放在Service层，Controller层负责页面交互逻辑。
+ 参考：[AngularJS中如何对Controller与Service进行分层设计与编码](http://www.jianshu.com/p/1e1aaf0fd30a)
      
## controller之间的通信
+ 父级controller → 子级controller: $broadcast
+ 子级controller → 父级controller: $emit
+ $on用于接收event与data
+ 兄弟controller之间不可直接通信
+ 另一种方式是通过$rootScope通信，但一般不建议使用这种方式
      
## 指令
+ AngularJS应用最重要的部分,它定义了AngularJS应用的根元素
+ 像ng-click/ng-model/ng-bind等，属于AngularJS内置的指令
+ 在实际项目中，很多时候，需要根据需要来自定义指令
      
## 服务（Service）
+ 以函数或对象形式存在
+ 常用服务：$http,$timeout,$interval，$location等
+ 可以自定义服务
      
## 路由
+ AngularJS最适合用于开发SPA(路由放前端)
      
## Tips
+ ng-change监测的是input的输入值的变化，通过js改变input的value，ng-change是监测不到的
+ 当input的type为'file'时，ng-change无效，此时应使用onchange(onchange=angular.element(this).scope().xxx()") 
