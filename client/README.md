# ipadhud

> PCHud in iPad

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 注意事项

### mui引入

1. [参考链接](http://ask.dcloud.net.cn/article/13509)

2. [报错原因与处理方式](https://blog.csdn.net/u012815877/article/details/81187826)

### 打包问题

1. [关于vue2.0+hbuilder打包移动端app之后空白页面的解决方案](https://www.cnblogs.com/ZT0219/p/7992440.html)

## 目前的难点

### 排序

### 布局

### 切换效果

## css3进阶

### 条状背景色

[repeating-linear-gradient](http://www.css88.com/book/css/values/image/repeating-linear-gradient().htm)

## 技术栈

vue全家桶-vuex-mui-flexible-gridly-sass

### vue-cli

使用`vue-cli`创建项目模板，提前在[node官网](https://nodejs.org/en/)下载安装`node.js`，然后全局安装`vue-cli`，忽略`node.js`安装过程，其他操作如下。

```shell
# 查看版本号就正常
$ npm -v

# 转淘宝镜像 之后就可以用cnpm代替npm，但是淘宝镜像有些包不太完整，可能会有bug.
$ npm install -g cnpm --registry=https://registry.npm.taobao.org

# 安装vue
$ npm install vue

# 全局安装vue-cli
$ npm i -global vue-cli

# 基于vue-cli创建项目，temlpateName：你想要使用的模板名称，比如：webpack等。projectName：你的项目名称，不能有大写字母。
$ vue init temlpateName projectName

# 之后会进行一些选择，根据个人情况定。
...
```

### vuex

`vue`状态管理器。不多说，就是把数据拿出来单独管理。具体看[vuex官网](https://vuex.vuejs.org/zh/)说明吧。引用 Redux 的作者 Dan Abramov 的话说就是：
> Flux 架构就像眼镜：您自会知道什么时候需要它。

### [mui](http://dev.dcloud.net.cn/mui/getting-started/)

移动端UI框架，封装了原生的[HTML5 api](http://www.html5plus.org/doc/zh_cn/webview.html)接口。

### flexible

flexible.js和rem，解决移动端设备兼容问题

### gridly

项目需求，基于jQuery的拖拽排序插件

### sass

css 预编译