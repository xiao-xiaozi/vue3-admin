import { createRouter, createWebHistory } from "vue-router";
import { useMenuStore } from "@/stores/menu";
import { usePageStore } from "@/stores/page";


const Layout = () => import('@/Layout/LayoutIndex.vue')


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
        },
        {
          path: "test-two",
          name: "TestTwo",
          component: () => import("@/views/TestTwo.vue"),
          meta: { title: 'TestTwo' }
        }
      ]
    },
    {
      path: "/test-three",
      name: "TestThree",
      redirect: "/test-three/closePageCache",
      component: Layout,
      children: [
        {
          path: "closePageCache",
          name: "ClosePageCache",
          component: () => import("@/views/testThree/ClosePageCache.vue"),
          meta: {
            cache: false, 
            title: '页面不开启缓存' 
          }
        },
        {
          path: "pageCache",
          name: "PageCache",
          component: () => import("@/views/testThree/PageCache.vue"),
          meta: {
            cache: true, 
            title: '开启页面缓存' 
          }
        },
        {
          path: "child-3",
          name: "ChildThree",
          redirect: "/test-three/child-3/CT-one",
          children: [
            {
              path: "CT-one",
              name: "CTOne",
              component: () => import("@/views/testThree/ChildThree/CTone.vue")
              ,meta: { title: '测试菜单3-3-1' }
            }
          ]
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
    }
  ] 
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 设置当前打开的菜单
  let menuStore = useMenuStore();
  menuStore.setCurrentMenu(to.path);
  next();
});

// 全局后置钩子
// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
  // 将打开的页面加入到已打开页面进行维护
  let pageStore = usePageStore()
  pageStore.openPage(to)
})

export default router
