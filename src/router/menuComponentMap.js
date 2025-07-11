// 菜单路由的组件
export default {
  "Layout": () => import('@/Layout/LayoutIndex.vue'),
  "richTextEditor": () => import('@/views/feature/RichTextEditor.vue'),
  "normalPage": () => import('@/views/testMenu/NormalPage.vue'),
  "pageCache": () => import('@/views/testMenu/PageCache.vue'),
  "pageNotCache": () => import('@/views/testMenu/PageNotCache.vue'),
  "thirdLevelMenu": ()=>import('@/views/testMenu/ThirdLevelMenu.vue'),
  "containerCom": () => import('@/views/component/ContainerCom.vue'),
  'infiniteScroll': () => import('@/views/component/InfiniteScroll.vue'),
  "permissionControl": () =>import('@/views/component/PermissionControl.vue')
}