import { computed, ref } from "vue";
import { defineStore } from "pinia";
// import menuData from "@/mock/menu.js";

export const useMenuStore = defineStore("menu", () => {
  // 标记是否已拉取异步菜单，登录信息等数据
  let hasPermission = ref(false)
  // 默认打开菜单
  let activeMenu = ref("/index");
  // 首页固定显示
  let fixMenus = [{
    path: "/index", 
    title: "首页",
    meta: { icon: 'HomeFilled' }
  }]
  // 头部菜单
  let menus = ref([{
    path: "/index", 
    title: "首页",
    meta: { icon: 'HomeFilled' }
  }]);
  // 侧边菜单,
  const asideMenu = computed(() => {
    let currentMenuComprise = activeMenu.value.split("/");
    let topMenuComprise = currentMenuComprise[1];
    let arr = [];
    // 根据当前选中的头部菜单获取其子菜单作为侧边菜单数据
    for (let item of menus.value) {
      if (item.path.includes(topMenuComprise)) {
        arr = item.children ? item.children : [];
        break;
      }
    }
    return arr;
  });
  // 设置当前激活的菜单
  function setCurrentMenu(value) {
    activeMenu.value = value;
  }

  // 设置菜单
  function setMenus(menusArr){
    menus.value = fixMenus.concat(menusArr)
    console.log(menus.value)
  }


  // 控制侧边菜单是否可以展开
  let asideIsCollapse = ref(false)
  function changeAsideIsCollapse(){
    asideIsCollapse.value = !asideIsCollapse.value
  }

  return { 
    activeMenu,
    asideIsCollapse,
    menus,
    asideMenu,
    hasPermission,
    setCurrentMenu,
    changeAsideIsCollapse,
    setMenus
  };
});
