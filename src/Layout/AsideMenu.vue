<script setup>
import SubMenu from "./SubMenu.vue";
import { useMenuStore } from "../stores/menu";
import { computed } from "vue";
const menuStore = useMenuStore();
const menus = computed(() => menuStore.menus);
</script>
<template>
  <el-menu :default-active="menuStore.currentMenu" :router="true">
    <template v-for="menu in menus" :key="menu.path">
      <SubMenu v-if="menu.children" :menu="menu" />
      <el-menu-item v-else :index="menu.path">{{ menu.title }}</el-menu-item>
    </template>
  </el-menu>
</template>
<style lang="scss" scoped></style>
