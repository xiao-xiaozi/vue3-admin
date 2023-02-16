import { computed, reactive, ref } from "vue";
import { defineStore } from "pinia";
import menuData from "@/mock/menu.js";

export const useMenuStore = defineStore("menu", () => {
  let activeMenu = ref("/index");
  // 头部菜单
  const menus = reactive(menuData);
  // 侧边菜单,
  const asideMenu = computed(() => {
    let currentMenuComprise = activeMenu.value.split("/");
    let topMenuComprise = currentMenuComprise[1];
    let arr = [];
    // 根据当前选中的头部菜单获取其子菜单作为侧边菜单数据
    for (let item of menus) {
      if (item.path.includes(topMenuComprise)) {
        arr = item.children ? item.children : [];
        break;
      }
    }
    return arr;
  });
  function setCurrentMenu(value) {
    activeMenu.value = value;
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
    setCurrentMenu,
    changeAsideIsCollapse
  };
});
