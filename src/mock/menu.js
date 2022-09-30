export default [
  { path: "/index", title: "首页" },
  { path: "/test-two", title: "测试菜单2" },
  {
    path: "/test-three",
    title: "测试菜单3",
    children: [
      { path: "/test-three/child-1", title: "测试菜单3-1" },
      { path: "/test-three/child-2", title: "测试菜单3-2" },
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
