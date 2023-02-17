import { defineStore } from "pinia";
import { reactive, ref } from 'vue'


export const usePageStore = defineStore('page', () => {

  // 当前显示页面的route.name
  const currentPageName = ref('HomeView')
  // 当前打开的页面数组 []:route
  const opened = reactive([])
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
  // 打开新页面
  function addOpened(route){
    // Error: Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.
    opened.push(route)
  }
  // 更新打开页面的路由参数
  function updateOpenedRoute(newRoute){
    let openedRoute = opened.find(route => route.name === newRoute.name)
    openedRoute.params = newRoute.params
    openedRoute.query = newRoute.query
  }
  // 关闭页面
  function closePage(closeRoute) {
    let closeIndex = opened.findIndex(route => route.name === closeRoute.name)
    // 判断关闭页面是否为当前显示页面，是则需要打开一个新页面
    if(closeRoute.name === currentPageName.value) {
      // 默认取关闭页面的前一个页面进行展示
      updateCurrentPageName(opened[closeIndex - 1].name)
    }
    opened.splice(closeIndex, 1)
  }
  // 更新当前显示页面的route.name
  function updateCurrentPageName(newPageName) {
    currentPageName.value = newPageName

  }

  // 开启缓存的页面, 关闭页面时，页面若开启了缓存，则从keepAliceRouteName中移除，销毁该组件。
  const keepAliveRouteName = reactive(new Set())
  function addKeepAlive(routes) {
    if (Array.isArray(routes)) {
      if (Reflect.has(routes, 'children') && Array.isArray(routes.children) && routes.children.length) {
        addKeepAlive(routes.children)
      } else {
        if (Reflect.has(routes, 'meta') && routes.meta) keepAliveRouteName.add(routes.name)
      }
    } else {
      throw new Error('routes must be Array!')
    }
  }

  return {
    opened,
    keepAliveRouteName,
    currentPageName,
    openPage,
    closePage,
    addKeepAlive,
    updateCurrentPageName
  }

})