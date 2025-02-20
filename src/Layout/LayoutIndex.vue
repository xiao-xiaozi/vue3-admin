<script setup>
import { RouterView } from "vue-router";
import HeadMenu from "@/Layout/HeadMenu.vue";
import AsideMenu from "./AsideMenu.vue";
import TabsPage from "./TabsPage.vue"
import { useUserStore } from "@/stores/user";
import router from "@/router";
import util from "@/utils";
import { usePageStore } from "@/stores/page";
import { computed } from 'vue'

const userStore = useUserStore()

function logout() {
  ElMessageBox.confirm('确定注销登录吗？', '提示', { type: 'warning', }).then(() => {
    userStore.resetAllState()
    util.cookie.remove('token')
    router.push('/login')
    ElMessage.success('退出登录！')
  }).catch(() => {
    ElMessage.info('取消！')
  })
}


const pageStore = usePageStore()
// 开启缓存的页面
const cachePages = computed(() => [...pageStore.keepAliveRouteName])



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
            height="50">
        </div>
        <HeadMenu class="head-menu" />
        <div class="user-info">
          <span class="user-name">{{ userStore.userInfo.name }}</span>
          <el-dropdown class="dropdown-avatar">
            <el-image :src="userStore.userInfo.avatarUrl" class="user-avatar" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <div class="layout-container">
        <el-aside class="layout-aside">
          <AsideMenu />
        </el-aside>
        <div class="layout-container-main">
          <!-- 打开的菜单 -->
          <TabsPage />
          <el-main class="layout-el-main">
            <RouterView v-slot="{ Component, route }">
              <Transition name="fade-transverse" mode="out-in">
                <KeepAlive :include="cachePages">
                  <component :is="Component" :key="route.name" />
                </KeepAlive>
              </Transition>
            </RouterView>
          </el-main>
        </div>
      </div>
    </el-container>
  </div>
</template>
<style lang="scss" scoped>
$aside-menu-width: 210px;
$head-menu-background-color: #f7f7f7;
$head-left-background-color: #fcfcfc;
$aside-menu-background-color: #fff;

.common-layout {
  height: 100%;

  .layout-container {
    display: flex;
    height: calc(100vh - 60px);

    .layout-aside {
      width: $aside-menu-width;
      border-right: 1px solid #f1f1f1;
      background-color: $aside-menu-background-color;
    }

    .layout-container-main {
      height: 100%;
      width: 100%;

      .layout-el-main {
        height: calc(100% - 41px);
        overflow: hidden;
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

// 过渡动画 横向渐变
.fade-transverse-leave-active,
.fade-transverse-enter-active {
  transition: all 0.5s;
}

.fade-transverse-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transverse-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

</style>
