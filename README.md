# Fangsea-web 2.0 框架文档

一、框架选型 

1. 前后端分离已成为互联网项目开发的业界标准使用方式，通过nginx+tomcat的方式有效的进行解耦，并且前后端分离会为以后的大型分布式架构、弹性计算架构、微服务架构、多端化服务（多种客户端，例如：浏览器，车载终端，安卓，IOS等等）打下坚实的基础

2. 基于Fangsea-web 2.0 属于电商平台网站，采用SPA单页面模式会影响网站SEO搜索引擎优化，为了解决SEO采用了SSR服务端渲染 Nuxt.js (@nuxt/express)

3. Nuxt.js 是一个基于 Vue.js 的通用应用框架。通过对客户端/服务端基础架构的抽象组织，Nuxt.js 主要关注的是应用的 UI渲染

二、框架模块

1. 框架集成：Nuxt + Vue2 + Ant-Design-Vue + Less + Express + Webpack4 + ES6

2. Nuxt：基于 Vue、Webpack 和 Babel集成了以下组件/框架，Vue 2 、Vue-Router、Vuex、Vue-Meta。另外，Nuxt.js 使用 Webpack 和 vue-loader 、 babel-loader 来处理代码的自动化构建工作（如打包、代码分层、压缩等等）

3. Vue：提供MVVM数据双向绑定的库，专注于UI层面，核心思想：数据驱动、组件系统

4. Ant-Design-Vue：开箱即用的高质量 Vue 组件，支持服务端渲染

5. Less：CSS 预处理语言，它扩充了 CSS 语言，增加了诸如变量、混合（mixin）、函数等功能，让 CSS 更易维护、方便制作主题、扩充

6. Express：一个简洁而灵活的 Node.js Web应用框架, 提供了一系列强大特性帮助你创建各种 Web 应用，和丰富的 HTTP 工具

7. Webpack4：静态模块的打包工具，将工程中的静态资源根据我们声明的依赖关系，打包出最后的正常运行的输出文件

三、项目依赖

1. @nuxtjs/axios：代理跨域请求

2. postcss-px2rem：自动转换px/rem移动端兼容

3. vue-i18n：静态国际化

4. less-loader：编译.less > .css 


四、目录介绍

1. nuxt：Nuxt编译文件目录，自动生成

2. api：express文件目录

3. assets：资源目录assets用于组织未编译的静态资源如LESS、SASS或JavaScript

4. components：组件目录components用于组织应用的Vue.js组件。Nuxt不会扩展增强该目录下 Vue组件，即这些组件不会像页面组件那样有asyncData方法的特性

5. layouts：布局目录layouts用于组织应用的布局组件

6. locales：国际化语言包目录

7. middleware：目录用于存放应用的中间件

8. node_modules：项目依赖目录

9. pages：页面目录pages用于组织应用的路由及视图。Nuxt框架读取该目录下所有的Vue文件并自动生成对应的路由配置

10. plugins：插件目录plugins用于组织那些需要在根Vue应用实例化之前需要运行的Javascript插件

11. static：静态文件目录static用于存放应用的静态文件，此类文件不会被 Nuxt调用 Webpack 进行构建编译处理。 服务器启动的时候，该目录下的文件会映射至应用的根路径/下

12. store：目录用于组织应用的Vuex状态树文件。Nuxt框架集成了Vuex 状态树的相关功能配置

13. Nuxt.config.js：Nuxt配置详情

14. package.json：项目信息及项目依赖管理
