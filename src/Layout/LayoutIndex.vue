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
          <!-- <el-footer>Footer</el-footer> -->
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<style lang="scss" scoped>
$asideMenuWidth: 210px;
.common-layout {
  height: 100%;
  .el-container {
    height: 100%;
    .el-aside {
      max-width: $asideMenuWidth;
      border-right: 1px solid #ccc;
      .el-menu {
        border-right: none;
      }
    }
  }
  .el-header {
    display: flex;
    padding: 0;
    .head-left {
      width: $asideMenuWidth;
      background-color: #fcfcfc;
      text-align: center;
      .logo {
        margin-top: 5px;
      }
    }
    .head-menu {
      flex: 1;
      border-bottom: none;
    }
  }
}
</style>
