<script setup>
import { usePageStore } from '@/stores/page';
import { computed } from 'vue'
import { useRouter } from "vue-router"

const router = useRouter()
const pageStore = usePageStore()
let openedPage = computed(() => pageStore.opened)

function tabName(route) {
  if(Reflect.has(route, 'meta')) {
    return route.meta.title || route.label
  }else {
    route.label
  }
}

// 当前打开的页面名称
let currentPageName = computed({
  get: () => {
    return pageStore.currentPageName
  },
  set: (val) => {
    pageStore.updateCurrentPageName(val)
  }
})

// 点击标签页切换路由
function tabClick(params){
  router.push({ name: openedPage.value[parseInt(params.index)].name })
}
// 关闭标签页
function tabRemove(tabPaneName) {
  let closeRoute = openedPage.value.find(route => route.name === tabPaneName)
  pageStore.closePage(closeRoute)
}

</script>
<template>
  <div class="tabs-page">
    <el-tabs 
      v-model="currentPageName"
      type="card"
      :closable="true"
      @tab-click="tabClick"
      @tab-remove="tabRemove"
      class="opened-page-tab">
      <el-tab-pane 
        v-for="page in openedPage"
        :key="page.name"
        :name="page.name"
        :label="tabName(page)"></el-tab-pane>
    </el-tabs>
  </div>
</template>
<style lang='scss' scoped>
.tabs-page {
  .opened-page-tab {
    border: none;
    background-color: #fcfcfc;

    & :deep(.el-tabs__header) {
      margin-bottom: 0;
    }

    & :deep(.el-tabs__content) {
      padding: 0;
    }

    & :deep(.el-tabs__nav) {
      .el-tabs__item:first-child {
        &:hover {
          padding: 0 20px;
        }

        .is-icon-close {
          width: 0;
        }
      }
    }
  }
}
</style>