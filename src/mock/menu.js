export default [
  {
    path: "/index", 
    title: "首页",
    meta: { icon: 'HomeFilled' }
  },
  {
    path: "/test-two",
    title: "测试菜单2" 
  },
  {
    path: "/test-three",
    title: "测试菜单3",
    children: [
      {
        path: "/test-three/closePageCache",
        title: "页面不开缓存" 
      },
      {
        path: "/test-three/pageCache",
        title: "开启页面缓存" 
      },
      {
        path: "/test-three/child-3",
        title: "测试菜单3-3",
        children: [
          {
            path: "/test-three/child-3/CT-one",
            title: "测试菜单3-3-1" 
          }
        ]
      }
    ]
  }
];
