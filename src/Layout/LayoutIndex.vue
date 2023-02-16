<script setup>
import { RouterView } from "vue-router";
import HeadMenu from "@/Layout/HeadMenu.vue";
import AsideMenu from "./AsideMenu.vue";
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="head-left">
          <img
            alt="Vue logo"
            class="logo"
            src="@/assets/logo.svg"
            width="50"
            height="50" />
        </div>
        <HeadMenu class="head-menu" />
      </el-header>
      <el-container>
        <el-aside>
          <AsideMenu />
        </el-aside>
        <el-container>
          <el-main>
            <RouterView />
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/style/variable";

$aside-menu-width: 210px;
$head-menu-background-color: #f7f7f7;
$head-left-background-color: #fcfcfc;
$aside-menu-background-color: #fff;

.common-layout {
  height: 100%;

  .el-container {
    height: 100%;

    .el-aside {
      max-width: $aside-menu-width;
      border-right: 1px solid #f1f1f1;
      background-color: $aside-menu-background-color;

      .el-menu {
        border-right: none;
      }
    }
  }

  .el-header {
    display: flex;
    padding: 0;

    .head-left {
      width: $aside-menu-width;
      background-color: $head-left-background-color;
      text-align: center;

      .logo {
        margin-top: 5px;
      }
    }

    .head-menu {
      flex: 1;
      border-bottom: none;
      background-color: $head-menu-background-color;
    }
  }
}
</style>
