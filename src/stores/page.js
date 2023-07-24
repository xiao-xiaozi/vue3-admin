import router from "@/router/index";
import { defineStore } from "pinia";
import { reactive, ref } from 'vue'
import { useLowdbStore } from "./lowdb";
import { merge } from "lodash";


export const usePageStore = defineStore('page', () => {

  // 当前显示页面的route.name，用于控制当前显示哪个标签页
  const currentPageName = ref('HomeView')
  // 当前打开的页面数组(打开的标签页数据) []:route
  const opened = reactive([
    { name: 'HomeView', meta: { title: '首页' }}
  ])
  /**
   * 打开新页面
   * @param {*} openRoute 
   */
  function openPage(openRoute){
    // 更新当前打开的页面名
    updateCurrentPageName(openRoute.name)

    let pageOpened = opened.find(route => route.name === openRoute.name)
    if(pageOpened) {
      // 页面已经打开了，可能路由参数不一致，需进行路由参数更新
      updateOpenedRoute(openRoute)
    }else {
      // 页面不曾打开过，直接将当前route加入到opened
      addOpened(openRoute)
    }
  }
  /**
   * 将打开的新页面，添加到打开的标签页数组中
   * @param {*} route 
   */
  function addOpened(route){
    // Error: Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.
    // opened.push(route)
    // inTab属性为true时，才将路由放入标签页中
    // if(Reflect.has(route.meta,'inTab') && route.meta.inTab) {
    //   opened.push(route)
    // }
    // 修改是否加入到打开的标签页判断
    // 取消inTab, 通过hidden判断
    if(Reflect.has(route.meta,'hidden') && route.meta.hidden) {
      return
    }else {
      // opened.push(route)
      opened.push({
        name: route.name, 
        path: route.path,
        fullPath: route.fullPath,
        meta: route.meta 
      })
      // 更新持久化中的opened数据
      opened2db()
    }
  }
  /**
   * 更新打开页面的路由参数
   * @param {*} newRoute 
   */
  function updateOpenedRoute(newRoute){
    let openedRoute = opened.find(route => route.name === newRoute.name)
    openedRoute.params = newRoute.params
    openedRoute.query = newRoute.query
    // 更新持久化中的opened数据
    opened2db()
  }
  /**
   * 关闭打开的页面
   * @param {*} closeRoute 
   */
  function closePage(closeRoute) {
    let closeIndex = opened.findIndex(route => route.name === closeRoute.name)
    // 判断关闭页面是否为当前显示页面，是则需要打开一个新页面
    if(closeRoute.name === currentPageName.value) {
      // 默认取关闭页面的前一个页面进行展示
      // updateCurrentPageName(opened[closeIndex - 1].name)
      // fix: 通过路由跳转，而不是手动更新当前标签页
      router.push({ name: opened[closeIndex - 1].name })
    }
    opened.splice(closeIndex, 1)
    // 更新持久化中的opened数据
    opened2db()
  }
  /**
   * 更新当前显示页面的route.name
   * 切换当前打开的标签页
   * @param {*} newPageName 
   */
  function updateCurrentPageName(newPageName) {
    currentPageName.value = newPageName
  }

  // 路由缓存 Todo: 根据route配置生成需要缓存的页面name数组，与keepAlive搭配使用
  // 开启缓存的页面, 关闭页面时，页面若开启了缓存，则从keepAliceRouteName中移除，销毁该组件。
  const keepAliveRouteName = reactive(new Set())
  /**
   * 找到路由数据中，需要开启缓存的路由
   * @param {*} routes 
   */
  function findKeepAliveRoute(routes) {
    if (Array.isArray(routes)) {
      routes.forEach(route => {
        if(Reflect.has(route, 'children')) {
          if(Array.isArray(route.children) && route.children.length) findKeepAliveRoute(route.children)
        }else {
          if(Reflect.has(route,'meta') && route.meta.cache) keepAliveRouteName.add(route.name)
        }
      })
    } else {
      throw new Error('routes must be Array!')
    }
  }


  // 将已打开的页面进行持久化，解决刷新丢失已打开页面问题
  let openedLoaded = ref(false) // 标记是否已加载持久化中的页面数据
  const lowdbStore = useLowdbStore()
  /**
   * 从持久化数据中加载打开的标签页数据
   */
  async function openedLoad(){
    const value = await lowdbStore.getDB({
      dbName: 'sys',
      path: 'page.opened',
      defaultValue: opened,
      user: true
    })
    // 在处理函数中进行数据优化 过滤掉现在已经失效的页签或者已经改变了信息的页签
    // 以 fullPath 字段为准
    // 如果页面过多的话可能需要优化算法
    // valid 有效列表 1, 1, 0, 1 => 有效, 有效, 失效, 有效
    const valid = []
    const result = value.map(page => {
      if(page.fullPath === '/index') {
        valid.push(1)
        return page
      }
      // 尝试在所有的支持多标签页的页面里找到 name 匹配的页面
      const find = tabPages.find(item => item.name === page.name)
      // 记录有效或无效信息
      valid.push(find ? 1 : 0)
      // 返回合并后的数据 新的覆盖旧的
      // 新的数据中一般不会携带 params 和 query, 所以旧的参数会留存
      return merge({}, opened, find)
    }).filter((el,index) => valid[index] === 1)
    // 将持久化打开的标签页赋值到opened
    opened.length = 0
    opened.push(...result)
    // 标记已经加载持久化的已打开标签页
    openedLoaded.value = true
  }
  /**
   * 将opened 已打开的标签页数据持久化
   */
  function opened2db(){
    lowdbStore.setDB({
      dbName: 'sys',
      path: 'page.opened',
      value: opened,
      user: true
    })
  }


  // 收集所有可以在标签页显示的页面信息
  let tabPages = reactive([])
  /**
   * 根据路由信息找到所有可以在标签页打开的菜单信息
   * 用于与持久化中存储的打开的标签页信息进行比对，将不存在于tabPages的持久化打开的标签页丢弃
   * @param {*} routes 
   */
  function findAllInTabPage(routes){
    tabPages.length = 0 // 先重置旧数据
    const pushFn = function(routes) {
      routes.forEach(route => {
        if(Reflect.has(route,'children') && Array.isArray(route.children)) {
          pushFn(route.children)
        }else if(!Reflect.has(route.meta,'hidden') || (Reflect.has(route.meta,'hidden') && !route.meta.hidden)) {
          const {
            meta, name, path 
          } = route
          tabPages.push({
            meta, name, path 
          }) 
        }
      })
    }

    pushFn(routes)
  }

  return {
    opened,
    keepAliveRouteName,
    currentPageName,
    tabPages,
    openPage,
    closePage,
    findKeepAliveRoute,
    updateCurrentPageName,
    findAllInTabPage,
    openedLoad
  }

})