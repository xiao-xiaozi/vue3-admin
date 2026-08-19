# vue3-admin

![Statements](https://img.shields.io/badge/statements-34.54%25-orange)
![Branches](https://img.shields.io/badge/branches-91.05%25-brightgreen)
![Functions](https://img.shields.io/badge/functions-88.67%25-brightgreen)
![Lines](https://img.shields.io/badge/lines-34.54%25-orange)

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

### Mock API

Development and the static demo use the MSW handlers in `src/mocks` by default. Any non-empty username and password can be used to sign in.

To connect to a real backend, create `.env.local`:

```ini
VITE_API_MODE='real'
VITE_API_BASE_URL='https://api.example.com'
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run Test Coverage

```sh
npm run coverage
```

Coverage report will be generated in `coverage/` directory. Open `coverage/index.html` in browser to view the detailed report.

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```


# Todo
- [X] 自定义指令判断是否渲染当前元素（HasPermission组件）
- [x] 页面的缓存机制配置
- [ ] 菜单icon因为按需引入缘故，通过component加载时无法正常显示。手动引入或其他方法？手动引入
- [x] 维护当前打开的页面数据
- [X] 使用MSW加载仓库内mock数据
- [X] 页面切换动画
- [X] 打开的标签页信息中首页不可删除，不显示删除按钮。
- [X] 简易的登录页以及后台渲染基础框架
- [X] 动态挂载菜单
  - [X] 处理可在标签页打开的菜单,预期在route.mete中新增inTab属性
- [X] 打开的标签页做持久化，否则刷新时会丢失
- [X] 自动引入elementPlus组件时，配置默认语言为中文
- [X] 部署Github Page后，lowdb.write方式报错`TypeError: Converting circular structure to JSON`
- [X] 使用`jsconfig.json`配置，导致组件名称的绿色颜色没有了，同时`computed`等方法无法自动导入。但可以联想路径，配置有问题？？？


```json
{
    "compilerOptions": {
        "target": "es2016",
        "allowSyntheticDefaultImports": false,
        "baseUrl": "./",
        "module": "esnext", //使用模块化的时候，使用es的模块化
        "moduleResolution": "node", //模块的查找顺序按照node的顺序进行查找
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
加上`"module": "esnext"` 和 `"moduleResolution": "node"` 配置可解决模块导入问题。（组件名绿色丢失和Vue方法自动导入）





# 参考/借鉴

[d2-admin](https://github.com/d2-projects/d2-admin)
