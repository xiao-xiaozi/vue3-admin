import { computed, reactive, ref } from "vue";
import { defineStore } from "pinia";
import menuData from "@/mock/menu.js";

export const useMenuStore = defineStore("menu", () => {
  let currentMenu = ref("/index");
  // 头部菜单
  const menus = reactive(menuData);
  // 侧边菜单,
  const asideMenu = computed(() => {
    let currentMenuComprise = currentMenu.value.split("/");
    let topMenuComprise = currentMenuComprise[1];
    let arr = [];
    for (let item of menus) {
      if (item.path.includes(topMenuComprise)) {
        arr = item.children ? item.children : [];
        break;
      }
    }
    return arr;
  });
  function setCurrentMenu(value) {
    currentMenu.value = value;
  }

  return { currentMenu, menus, asideMenu, setCurrentMenu };
});
