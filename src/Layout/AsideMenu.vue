<script setup>
import SubMenu from "./SubMenu.vue";
import { useMenuStore } from "../stores/menu";
import { computed } from "vue";
const menuStore = useMenuStore();
const menus = computed(() => menuStore.asideMenu);
const isCollapse = computed(() => menuStore.asideIsCollapse)


</script>
<template>
  <el-menu
    class="layout-aside-menu"
    :default-active="menuStore.activeMenu"
    :router="true"
    :collapse="isCollapse"
    v-if="menus.length">
    <template v-for="menu in menus" :key="menu.path">
      <SubMenu v-if="menu.children" :menu="menu" />
      <el-menu-item v-else :index="menu.path">{{ menu.title }}</el-menu-item>
    </template>
  </el-menu>
  <div v-else class="not-child-menu">暂无子级菜单!</div>
</template>

<style lang="scss" scoped>
.layout-aside-menu {
  border-right: none;
}

.not-child-menu {
  color: #333;
  text-align: center;
  margin-top: 20px;
}

</style>
