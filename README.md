# module

![![venus-fetch](https://www.npmjs.com/package/venus-fetch)](https://img.shields.io/badge/venus--fetch-^1.1.13-green)
![![iview](https://www.iviewui.com/docs/guide/install)](https://img.shields.io/badge/iview-^3.4.2-green)
![![iview](https://www.npmjs.com/package/eslint-config-venus/v/1.0.2)](https://img.shields.io/badge/eslint--config--venus-^1.0.2-green)

配合 `@vue/cli` 3.0 通过插件快速生成模块化(子应用)项目模版.

## 目录

- [脚本](#脚本)
- [结构](#结构)
- [特性](#特性)

## 脚本

### 本地开发

```shell
$ npm run serve
```

### 构建打包

- _模块化构建打包_

```shell
$ npm run module
```

- _普通模式构建打包_

```shell
$ npm run build
```

### 配合云效的相关脚本

- _加入新的环境变量_

```shell
$ npm run build -- --app_env='{"DNS_CODE": "test"}'
```

- _使用环境变量_

```javascript
// 网关 api 后缀根据 DNS_CODE 的值在编译时进行修改
const FORMAT_API_CODE = (s) => {
  const suffix = isDev ? '_test' : `_${`${process.env.DNS_CODE}` || 'pro'}`
  return `${s}${suffix}`
}
```

- _生成`nginx.conf`配置文件_

```shell
$ npm run build -- --port=8181 --root=/home/8181/mnt/dist
```

- _配置文件效果_

```nginx
server {

   listen   8181;

   #证书文件
   #ssl_certificate     /home/8181/mnt/dist/server.pem;
   #私钥文件
   #ssl_certificate_key /home/8181/mnt/dist/server.pem;
   #ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
   #ssl_ciphers         HIGH:!aNULL:!MD5;

   root /home/8181/mnt/dist;

   location / {
      try_files $uri @fallback;
   }
   location @fallback {
      rewrite .* /index.html break;
   }

   location /api/ {
      proxy_read_timeout 300; # Some requests take more than 30 seconds.
      proxy_connect_timeout 300; # Some requests take more than 30 seconds.
      proxy_set_header   X-Forwarded-Proto $scheme;
      proxy_set_header   Host              $host;
      proxy_set_header   X-Real-IP         $remote_addr;
      proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
      proxy_set_header   X-Forwarded-Ssl   on;
      proxy_set_header   X-Frame-Options   SAMEORIGIN;

      proxy_pass http://192.168.110.187:17000/api/;
   }

   index index.html index.htm index.cgi index.php index.php5;
}
  
```

>__`nginx.conf`中相关代理的配置与 dev service里proxy的配置保持一致。__

## 结构

```shell
   +-- public -------------------------------------------> 公用文件
   |
   +-- src ----------------------------------------------> 源码目录
   |   +-- assets ---------------------------------------> 全局资源目录
   |   |   +-- css --------------------------------------> 样式资源文件
   |   |   +-- img --------------------------------------> 图片资源文件
   |   |   +-- font -------------------------------------> 全局字体库
   |   |   +-- json -------------------------------------> 静态json文件
   |   |
   |   +-- components -----------------------------------> 全局组件目录
   |   |   +-- App --------------------------------------> App 组件目录 双驼峰
   |   |   |   +-- index.vue ----------------------------> 组件主入口
   |   |   |   +-- cell ---------------------------------> 组件下子组件文件夹
   |   |   +-- Other Component
   |   |   +-- index.js ---------------------------------> 全局注册入口
   |   |   +-- iview.js ---------------------------------> viewDesign 和 tqUi 组件注册入口
   |   |
   |   +-- directives -----------------------------------> 全局指令目录
   |   |   +-- resize-dom -------------------------------> 指令目录 命名采用连字符
   |   |   |   +-- index.js -----------------------------> 组件主入口
   |   |   +-- Other Directive
   |   |   +-- index.js ---------------------------------> 全局注册入口
   |   |
   |   +-- lib ------------------------------------------> 第三方库资源文件
   |   |
   |   +-- utils ----------------------------------------> 工具目录
   |   |   +-- index.js ---------------------------------> 注册入口
   |   |
   |   +-- router ---------------------------------------> 路由配置
   |   |
   |   +-- store ----------------------------------------> vuex配置
   |   |   +-- globe ------------------------------------> 持久化缓存的全局状态目录
   |   |   |   +-- modules ------------------------------> globe/[module] 状态模块
   |   |   |   +-- index.js -----------------------------> globe 入口文件
   |   |   +-- common -----------------------------------> 全局状态目录
   |   |   |   +-- modules ------------------------------> common/[module] 状态模块
   |   |   |   +-- index.js -----------------------------> common 入口文件
   |   |   +-- index.js ---------------------------------> store 入口文件
   |   |
   |   +-- views ----------------------------------------> 视图目录
   |   |   +-- tpl --------------------------------------> tpl模块
   |   |   |   +-- views --------------------------------> tpl下的视图文件
   |   |   |   |   +-- children -------------------------> tpl下的子路由
   |   |   |   |       +-- home -------------------------> /tpl/home 目录
   |   |   |   |           +-- components ---------------> /tpl/hone 下的组件目录
   |   |   |   |           |   +-- list -----------------> /tpl/home 下的 list 复杂组件
   |   |   |   |           |   |   +-- index.vue --------> /tpl/home 下的 list 复杂组件入口
   |   |   |   |           |   |   +-- cell -------------> /tpl/home 下的 list 复杂组件生成的 子组件目录
   |   |   |   |           |   |
   |   |   |   |           |   +-- list-item.vue --------> /tpl/home 下的 list-item 简单组件
   |   |   |   |           |
   |   |   |   |           +-- index.vue ----------------> /tpl/hone 下的视图文件
   |   |   |   |           +-- store.js -----------------> /tpl/home 页面使用到的 store
   |   |   |   |
   |   |   |   +-- components ---------------------------> tpl模块下公用的组件目录
   |   |   |   +-- router.js ----------------------------> tpl模块的路由配置
   |   |   |   +-- store.js -----------------------------> tpl的状态管理配置
   |   |   |   +-- index.js -----------------------------> tpl的注册入口
   |   |   |
   |   |   +-- index.js ---------------------------------> 视图统一组册入口
   |   |
   |   +-- app.js ---------------------------------------> app Vue实例生成，各全局组件/指令/函数注册
   |   +-- main.js --------------------------------------> 项目主入口
   |   +-- module.js ------------------------------------> 模块化模式的项目主入口
   |   +-- normalize.js ---------------------------------> 项目适配，主要实现各种 polyfill
   |   +-- pwa.js ---------------------------------------> pwa相关配置
   |
   +-- babel.config.js ----------------------------------> babel相关配置
   +-- vue.config.js ------------------------------------> vue cli 相关配置
   +-- .gitignore ---------------------------------------> git ignore 配置
   +-- package.json -------------------------------------> 项目信息/版本/npm脚本/依赖/eslint配置/postcss配置/游览器适配配置
   +-- README.md ----------------------------------------> 说明文档
```
## 版本更新
- 二期版本改造升级内容（2021-02-23）
   1. 修改`view-design`、`tq-u`i`加载方式，改为按需加载。
   2. 解决基座与子应用联调模式下，`跨域`问题（可升级至最新版本的 vue-cli-pligin-tq-tpl）。
   3. 优化子应用侧边栏UI展示及功能
   4. 修改 `dev:module` 指令 `NODE_ENV` 的值为 `dev-module`
   5. 接收基座传输的`操作权限`数据并进行更新
