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
- [X] 接入easy-mock加载mock数据
- [ ] 页面切换动画
- [X] 打开的标签页信息中首页不可删除，不显示删除按钮。
- [X] 简易的登录页以及后台渲染基础框架
- [X] 动态挂载菜单
  - [X] 处理可在标签页打开的菜单,预期在route.mete中新增inTab属性
- [X] 打开的标签页做持久化，否则刷新时会丢失
- [ ] 自动引入elementPlus组件时，配置默认语言为中文
- [X] 部署Github Page后，lowdb.write方式报错`TypeError: Converting circular structure to JSON`
- [ ] 使用`jsconfig.json`配置，导致组件名称的绿色颜色没有了，同时`computed`等方法无法自动导入。但可以联想路径，配置有问题？？？


```json
{
    "compilerOptions": {
        "target": "es2016",
        "allowSyntheticDefaultImports": false,
        "baseUrl": "./",
        "paths": {
            "@/*": [
                "src/*"
            ]
        }
    },
    "exclude": [
        "node_modules",
        "dist"
    ]
}
```





# 参考/借鉴

[d2-admin](https://github.com/d2-projects/d2-admin)