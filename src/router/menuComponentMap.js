// 菜单路由的组件
export default {
  "Layout": () => import('@/Layout/LayoutIndex.vue'),
  "testMenuSecond": () => import('@/views/TestMenuSecond.vue'),
  "pageCache": () => import('@/views/TestMenuThird/PageCache.vue'),
  "closePageCache": () => import('@/views/TestMenuThird/ClosePageCache.vue'),
  "threeLayerView": () => import('@/views/TestMenuThird/TestMenuThirdChild/ThreeLayerView.vue')
}