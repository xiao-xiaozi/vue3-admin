<script setup>
import SubMenu from "./SubMenu.vue";
import { useMenuStore } from "../stores/menu";
import { computed } from "vue";
const menuStore = useMenuStore();
const menus = computed(() => menuStore.asideMenu);
</script>
<template>
  <el-menu
    :default-active="menuStore.activeMenu"
    :router="true"
    v-if="menus.length">
    <template v-for="menu in menus" :key="menu.path">
      <SubMenu v-if="menu.children" :menu="menu" />
      <el-menu-item v-else :index="menu.path">{{ menu.title }}</el-menu-item>
    </template>
  </el-menu>
  <div v-else class="not-child-menu">暂无子级菜单!</div>
</template>
<style lang="scss" scoped>
.not-child-menu {
  color: #333;
  text-align: center;
  margin-top: 20px;
}
</style>
