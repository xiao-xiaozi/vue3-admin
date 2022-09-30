// import { ref, computed } from "vue";
import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import menuData from "@/mock/menu.js";

export const useMenuStore = defineStore("menu", () => {
  let currentMenu = ref("/index");
  const menus = reactive(menuData);
  // const doubleCount = computed(() => count.value * 2);
  function setCurrentMenu(value) {
    currentMenu.value = value;
  }

  return { currentMenu, menus, setCurrentMenu };
});
