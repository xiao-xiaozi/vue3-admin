// 菜单路由的组件
export default {
  "Layout": () => import('@/Layout/LayoutIndex.vue'),
  "testTwo": () => import('@/views/TestTwo.vue'),
  "pageCache": () => import('@/views/testThree/PageCache.vue'),
  "closePageCache": () => import('@/views/testThree/ClosePageCache.vue'),
  "CTone": () => import('@/views/testThree/ChildThree/CTone.vue')
}