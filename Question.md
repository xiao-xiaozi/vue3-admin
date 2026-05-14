# 项目问题清单

## 严重 Bug

### 1. ~~路由守卫中登录跳转失效~~ ✅ 已修复
**文件:** `src/router/index.js:89`
**问题:** `to.path === 'LoginView'` 比较的是路径(`/login`)和名称(`LoginView`)，永远为 `false`。已登录用户访问 `/login` 时不会重定向到首页。
**修复:** 改为 `to.name === 'LoginView'`（与第127行保持一致）

### 2. ~~标签页右键菜单关闭功能完全失效~~ ✅ 已修复
**文件:** `src/stores/page.js:195,218,240`, `src/Layout/TabsPage.vue:81`
**问题:** TabsPage 传入的 pageSelect 是 Ref 对象，closeLeftPage/closeRightPage/closeOtherPage 中又用 ref() 包裹一层，导致 clickPage.value 返回 Ref 而非字符串，页面名称比较全部失败。
**修复:** TabsPage 传参时取 .value 为普通字符串，page.js 中直接使用字符串不再包裹 ref。

### 3. ~~关闭全部标签页会移除首页~~ ✅ 已修复
**文件:** `src/stores/page.js:259`
**问题:** `opened[i] === 'HomeView'` 用对象比较字符串，永远为 `false`。首页被错误关闭。应为 `opened[i].name === 'HomeView'`。
**修复:** 改为 `opened[i].name === 'HomeView'`。

### 4. ~~标签页持久化恢复可能与当前状态产生竞态~~ ✅ 已修复
**文件:** `src/router/index.js:123`
**问题:** `pageStore.openedLoad()` 是异步函数但被当作 fire-and-forget 调用，内部的 opened 数组重置可能与 afterEach 中的 openPage() 冲突。
**修复:** 加上 `await` 确保持久化数据加载完成后再继续。

### 5. ~~标签页恢复时 merge 参数错误~~ ✅ 已修复
**文件:** `src/stores/page.js:141`
**问题:** `merge({}, opened, find)` 把整个数组当对象合并，应为 `merge({}, page, find)`。
**修复:** 将第一个源对象从 `opened`（数组）改为 `page`（当前持久化页面）。

### 6. ~~标签页标题可能显示空白~~ ✅ 已修复
**文件:** `src/Layout/TabsPage.vue:17`
**问题:** else 分支缺少 `return`，没有 meta 属性的路由标签页标题为 undefined。
**修复:** 加上 `return`。

---

## 安全隐患

### 7. ~~Token 存储未设置安全标志~~ ✅ 已修复
**文件:** `src/utils/util.cookie.js:13`
**问题:** Token 存储在 cookie 中但无 SameSite 等安全属性。
**修复:** 默认值添加 `sameSite: 'Strict'`，调用方可覆盖。
**注意:** HttpOnly 需服务端 Set-Cookie 头设置，前端 js-cookie 无法实现。

### 8. ~~API 请求未附带 token~~ ✅ 已修复
**文件:** `src/api/util.js`
**问题:** Axios 实例未配置 Authorization 请求头，token 未被发送。
**修复:** 添加请求拦截器，从 cookie 读取 token 以 Bearer 方式附加到 Authorization 头。

### 9. ~~路由守卫仅检查 token 是否存在~~ ✅ 已修复（间接）
**文件:** `src/router/index.js:82-84`
**问题:** 只检查 cookie 非空不验证有效性，伪造 cookie 可绕过登录。
**修复:** 结合 #8 和 #12 修复 — 伪造 token 会导致 API 调用 401（拦截器清除 token 并重定向）或 userResourceGet 失败（catch 块重定向到登录）。

### 10. ~~无 CSRF 保护~~ ✅ 已修复（间接）
**问题:** 整个代码库无 CSRF 防护。
**修复:** #8 改用 Bearer token（Authorization 头）鉴权，浏览器不会自动发送该头，CSRF 攻击无法构造有效请求。

### 11. ~~登录表单硬编码默认凭据~~ ✅ 已修复
**文件:** `src/views/LoginView.vue:14-17`
**问题:** username: "admin", password: "admin" 直接写在源码中。
**修复:** 改为空字符串。

### 12. ~~API 调用失败静默处理~~ ✅ 已修复
**文件:** `src/router/index.js:139-141`
**问题:** 权限 API 失败时只 console.log，导航继续但用户进入无菜单无权限的空白状态。
**修复:** 停止 NProgress，使用 console.error 记录，重定向到登录页。

---

## 代码质量问题

### 13. ~~logout 状态清理不完整~~ ✅ 已修复
**文件:** `src/stores/user.js:27`
**问题:** resetAllState() 不清理 permissionCode 和 userInfo。
**修复:** 增加 permissionCode 和 userInfo 的清空。

### 14+15. ~~ContextMenu 事件泄漏和 DOM 残留~~ ✅ 已修复
**文件:** `src/components/ContextMenu.vue:36-43`
**问题:** mousedown 监听器泄漏 + body 中孤儿 DOM 节点。
**修复:** watch 替换 watchEffect（关闭时移除监听器），onUnmounted 清理事件和 DOM。

### 16. ~~SubMenu 默认 prop 返回 undefined~~ ✅ 已修复
**文件:** `src/Layout/SubMenu.vue:2`
**问题:** default: () => {} 返回 undefined，应为 default: () => ({})。
**修复:** 箭头函数体加括号返回空对象。

---

## 工程问题

### 17. ~~项目几乎无测试~~ ✅ 已修复
**问题:** 唯一的测试文件测试的是已删除的 HelloWorld.vue 组件。
**修复:** 删除无效测试，补充 38 个单元测试覆盖核心模块：
- `util.cookie` — 7 tests（设置/读取/删除/安全默认值）
- `userStore` — 8 tests（初始状态/权限/用户信息/logout 清理）
- `pageStore` — 20 tests（标签页 CRUD/关闭全部/左右/其他/缓存/路由收集）
- `HasPermission` — 3 tests（权限码条件渲染）

### 18. ~~大量依赖严重过时~~ ✅ 已修复
**修复:** 全部 11 个核心依赖已升级至最新版本，53 个测试用例全通过，构建无错误：
element-plus 2.14.0、vue-router 4.6.3、pinia 2.3.1、sass 1.95+、jsdom 27.1.0、stylelint 16.23+、stylelint-config-standard 39.0.1、@vue/test-utils 2.4.6、unplugin-auto-import 20.3.0、unplugin-icons 22.5+、unplugin-vue-components 29.1+。

### 19. ~~vite-plugin-inspect 无条件加载~~ ✅ 已修复
**文件:** `vite.config.js`
**问题:** Inspect() 插件无环境判断，生产构建暴露调试信息。
**修复:** 改为 `mode !== 'production' && Inspect()`。

### 20. ~~环境文件可能被 git 追踪~~ ✅ 已修复
**问题:** .gitignore 只排除 *.local。
**修复:** 增加 .env、.env.local、.env.*.local 排除规则。

### 21. 多个占位符页面 ⚠ 低优先级
NormalPage.vue、ThirdLevelMenu.vue、PermissionControl.vue 几乎为空壳。
这些是测试用演示页面，非生产问题。

### 22. ~~死代码~~ ✅ 已修复
- ~~src/stores/menu.js 中 hasPermission ref~~ → 已移除
- ~~src/stores/counter.js~~ → 已删除（无引用）
- src/stores/user.js 中 import ref 但未使用 → **误报，ref 实际已使用**
- src/mock/menu.js 导出空数组 → 作为 staticRoutes 模板保留

### 23. HeadMenu 图标渲染未实现 ⚠ 特性缺失
**文件:** `src/Layout/HeadMenu.vue:18-25`
菜单图标代码被注释，顶部菜单只显示文字。需评估图标方案后实现。
