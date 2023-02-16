<script setup>
import { RouterView } from "vue-router";
import HeadMenu from "@/Layout/HeadMenu.vue";
import AsideMenu from "./AsideMenu.vue";
import { useUserStore } from "@/stores/user";
import router from "@/router";

const userStore = useUserStore()

function logout(){
  router.push('/login')
}


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
        <div class="user-info">
          <span class="user-name">{{ userStore.userInfo.name }}</span>
          <el-dropdown class="dropdown-avatar">
            <el-image :src="userStore.userInfo.avatarUrl" class="user-avatar"></el-image>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
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

    .user-info {
      width: 100px;
      background-color: $head-menu-background-color;
      position: relative;

      .user-name {
        line-height: 60px;
        user-select: none;
      }

      .dropdown-avatar {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);

        .user-avatar {
          width: 35px;
          height: 35px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
