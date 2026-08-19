const permissionRoutes = [
  {
    path: '/feature',
    name: 'Feature',
    component: 'Layout',
    redirect: '/feature/rich-text-editor',
    meta: { title: '功能示例', icon: 'Tools' },
    children: [
      {
        path: '/feature/rich-text-editor',
        name: 'RichTextEditor',
        component: 'richTextEditor',
        meta: { title: '富文本编辑器' }
      },
      {
        path: '/feature/page-cache',
        name: 'PageCache',
        component: 'pageCache',
        meta: { title: '页面缓存', keepAlive: true }
      },
      {
        path: '/feature/page-not-cache',
        name: 'PageNotCache',
        component: 'pageNotCache',
        meta: { title: '页面不缓存' }
      }
    ]
  },
  {
    path: '/component',
    name: 'ComponentExample',
    component: 'Layout',
    redirect: '/component/container',
    meta: { title: '组件示例', icon: 'Grid' },
    children: [
      {
        path: '/component/container',
        name: 'ContainerComponent',
        component: 'containerCom',
        meta: { title: '布局容器' }
      },
      {
        path: '/component/infinite-scroll',
        name: 'InfiniteScroll',
        component: 'infiniteScroll',
        meta: { title: '无限滚动' }
      },
      {
        path: '/component/permission-control',
        name: 'PermissionControl',
        component: 'permissionControl',
        meta: { title: '权限控制' }
      }
    ]
  },
  {
    path: '/menu-test',
    name: 'MenuTest',
    component: 'Layout',
    redirect: '/menu-test/normal',
    meta: { title: '菜单测试', icon: 'Menu' },
    children: [
      {
        path: '/menu-test/normal',
        name: 'NormalPage',
        component: 'normalPage',
        meta: { title: '普通页面' }
      },
      {
        path: '/menu-test/third-level',
        name: 'ThirdLevelMenu',
        component: 'thirdLevelMenu',
        meta: { title: '三级菜单示例' }
      }
    ]
  }
]

const userResource = {
  permissionRoutes,
  permissionCode: ['add'],
  userInfo: {
    uuid: 'mock-admin-001',
    name: 'admin',
    avatarUrl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK6QGdM32bNY7Qha63Pyp3HrphweuHPe4ZUvbtCr6SKaEGOFLMqLUaZXaX0hZx6xtkdiafeKqiacVpw/132'
  }
}

export default userResource
