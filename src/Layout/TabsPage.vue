<script setup>
import { usePageStore } from '@/stores/page';
import { computed, reactive } from 'vue'
import { useRouter } from "vue-router"
import { ref } from "vue"
import ContextMenu from "@/components/ContextMenu.vue"
import ContextMenuItem from '../components/ContextMenuItem.vue';

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

// 右键菜单
let contentMenuX = ref(0)
let contentMenuY = ref(0)
let tagName = ref('')
let contextmenuValue = ref(false)
function handleContextmenu(event){
  let target = event.target
  let flag = false
  if(target.className.indexOf('el-tabs__item') > -1) flag = true
  else if(target.parentNode.className.indexOf('el-tabs__item') > -1) {
    target = target.parentNode
    flag = true
  }
  if(flag) {
    event.preventDefault()
    event.stopPropagation()
    contentMenuX.value = event.clientX
    contentMenuY.value = event.clientY
    tagName.value = target.getAttribute('aria-controls').slice(5)
    contextmenuValue.value = true
  }
}
// 右键菜单数据
const contextmenuList = reactive([
  {
    icon: 'arrow-left', title: '关闭左侧', value: 'left' 
  },
  {
    icon: 'arrow-right', title: '关闭右侧', value: 'right' 
  },
  {
    icon: 'times', title: '关闭其它', value: 'other' 
  },
  {
    icon: 'times-circle', title: '关闭全部', value: 'all' 
  }
])
// 右键菜单项的点击事件
function contextmenuClick(command){
  if(tagName.value) contextmenuValue.value = false
  const params = { pageSelect: tagName }
  switch(command) {
    case 'left': pageStore.closeLeftPage(params);break
    case 'right': pageStore.closeRightPage(params);break
    case 'other': pageStore.closeOtherPage(params);break
    case 'all': pageStore.closeAllPage(params);break
  }
}

</script>
<template>
  <div class="tabs-page">
    <ContextMenu v-model="contextmenuValue" :x="contentMenuX" :y="contentMenuY">
      <ContextMenuItem :menu-list="contextmenuList" @row-click="contextmenuClick" />
    </ContextMenu>
    <el-tabs 
      v-model="currentPageName"
      type="card"
      :closable="true"
      class="opened-page-tab"
      @tab-click="tabClick"
      @contextmenu="handleContextmenu"
      @tab-remove="tabRemove">
      <el-tab-pane 
        v-for="page in openedPage"
        :key="page.path"
        :name="page.name"
        :label="tabName(page)" />
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

        // el-tab-pane的closable参数配置覆盖不了el-tabs，通过CSS实现首页不可关闭
        .is-icon-close {
          width: 0;
        }
      }
    }
  }
}
</style>