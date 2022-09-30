<script setup>
defineProps({
  menu: Object
});
</script>
<template>
  <el-sub-menu :index="menu.path">
    <template v-slot:title>{{ menu.title }}</template>
    <template v-for="child in menu.children" :key="child.path">
      <SubMenu v-if="child.children" :menu="child" />
      <el-menu-item :index="child.path" v-else>
        {{ child.title }}
      </el-menu-item>
    </template>
  </el-sub-menu>
</template>
<style lang="scss" scoped></style>
