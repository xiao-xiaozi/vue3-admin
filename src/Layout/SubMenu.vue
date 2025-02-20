<script setup>
defineProps({ menu: { type: Object,default: () => {} }});
</script>
<template>
  <el-sub-menu :index="menu.path">
    <template #title>{{ menu.title }} </template>
    <template v-for="child in menu.children" :key="child.path">
      <SubMenu v-if="child.children" :menu="child" />
      <el-menu-item v-else :index="child.path">
        {{ child.title }}
      </el-menu-item>
    </template>
  </el-sub-menu>
</template>
<!-- <style lang="scss" scoped></style> -->
