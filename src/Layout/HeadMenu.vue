<script setup>
import SubMenu from "./SubMenu.vue";
import { useMenuStore } from "@/stores/menu";
import { computed } from "vue";
const menuStore = useMenuStore();
const menus = computed(() => menuStore.menus);

</script>
<template>
  <el-menu
    class="head-menu"
    :default-active="menuStore.activeMenu"
    mode="horizontal"
    :router="true">
    <template v-for="menu in menus" :key="menu.path">
      <SubMenu v-if="menu.children" :menu="menu" />
      <el-menu-item v-else :index="menu.path">
        <!-- todo: icon按需加载，动态挂载菜单的icon无法显示 -->
        <!-- <template v-if="menu.meta && menu.meta.icon">
          <el-icon>
            <component :is="menu.meta.icon"></component>
            <IconEpHomeFilled />
          </el-icon>
        </template> -->
        <span>{{ menu.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<!-- <style lang="scss" scoped></style> -->
