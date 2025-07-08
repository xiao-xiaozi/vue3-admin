import { createRouter, createWebHashHistory } from "vue-router";
import { useMenuStore } from "@/stores/menu";
import { usePageStore } from "@/stores/page";
import { api } from "@/api"
import menuComponentMap from "./menuComponentMap";
import { cloneDeep } from "lodash"
import { useUserStore } from "@/stores/user";
import util from "@/utils";
import NProgress from "nprogress";
import 'nprogress/nprogress.css'
import staticRoutes from "@/mock/menu.js"

const Layout = () => import('@/Layout/LayoutIndex.vue')


const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Layout,
      redirect: "/index",
      children: [
        {
          path: "index",
          name: "HomeView",
          component: () => import("../views/HomeView.vue"),
          meta: { title: '首页' }
        }
      ]
    },
    {
      path: "/login",
      name: "LoginView",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/LoginView.vue")
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFountView',
      component: () => import('@/views/NotFoundView.vue')
    }
  ] 
});

/**
 * 将路由数据转为菜单数据所需结构 （优化可能性：菜单的title值不从menu.title获取，改为从mene.meta.title取，则无需处理路由数据新增menu.title属性）
 * @param {*} menus 
 */
function handleMenus(menus){
  menus.forEach(menu => {
    menu.title = (menu.meta && menu.meta.title) || '未命名菜单'
    if(Reflect.has(menu,'children') && Array.isArray(menu.children)) {
      handleMenus(menu.children)
    }
  })
}

function handlePermissionRoutes(routes) {
  routes.forEach(route => {
    route.component = menuComponentMap[route.component]
    if(Reflect.has(route, 'children') && Array.isArray(route.children)) {
      handlePermissionRoutes(route.children)
    }
  })
}



// 全局前置守卫
router.beforeEach(async (to) => {
  try {
    NProgress.start()

    let menuStore = useMenuStore();
    let userStore = useUserStore();
    let pageStore = usePageStore()
    let token = util.cookie.get('token')

    // 判断是否已登录
    if(token) {
      // 判断是否已获取权限信息(菜单，用户信息等)
      // hasPermissionInfo 通过是否已获取权限信息字段来判断
      if(userStore.hasPermissionInfo) {
        if(to.path === 'LoginView') {
          return { name: 'HomeView' }
        }else {
          // 设置当前打开的菜单
          menuStore.setCurrentMenu(to.path);
          return true
        }
      }else {
        let { data: { permissionRoutes, userInfo }} = await api.userResourceGet()
        
        const fullRoutes = [...permissionRoutes, ...staticRoutes,]
        
        let menus = cloneDeep(fullRoutes)
        handleMenus(menus)
        menuStore.setMenus(menus)

        handlePermissionRoutes(fullRoutes)
        fullRoutes.forEach(route =>{
          router.addRoute(route)
        })
        userStore.setHasPermissionInfo(true)
        // 更新用户信息
        if(userInfo) {
          userStore.setUserInfo(userInfo)
        }
        // 收集标签页菜单数据
        pageStore.findAllInTabPage(fullRoutes)
        // 收集开启缓存的页面
        pageStore.findKeepAliveRoute(fullRoutes)
        // 从持久化数据中加载已打开的标签页信息
        pageStore.openedLoad()

        if(to.name === 'LoginView') {
          return { name: 'HomeView' }
        }else {
          return to.fullPath
        }
      }
    }else {
      if(to.name !== 'LoginView') {
        NProgress.done()
        return { name: 'LoginView' }
      }
    }
  }catch(error){
    console.log(error)
  }
});

// 全局后置钩子
router.afterEach((to) => {
  NProgress.done()
  // 将打开的页面加入到已打开页面进行维护
  let pageStore = usePageStore()
  pageStore.openPage(to)
})

export default router
