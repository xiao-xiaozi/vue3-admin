# vue3-admin

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```


# Todo
- [ ] 自定义指令判断是否渲染当前元素
- [x] 页面的缓存机制配置
- [ ] 菜单icon因为按需引入缘故，通过component加载时无法正常显示。手动引入或其他方法？
- [ ] 带参数页面的缓存
- [x] 维护当前打开的页面数据
- [ ] 接入easy-mock加载mock数据
- [ ] 页面切换动画，打开的标签页信息中首页不可删除，不显示删除按钮。
- [X] 简易的登录页以及后台渲染基础框架
- [X] 动态挂载菜单
  - [ ] 处理可在标签页打开的菜单,预期在route.mete中新增inTab属性



# 介绍

## 关于路由和菜单

将路由和菜单整合到一份数据中，菜单数据由路由数据中产生。