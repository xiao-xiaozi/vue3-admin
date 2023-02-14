<script setup>
  const props = defineProps({
    showAside:{
      type:Boolean,
      default:true
    }
  })

  const emit = defineEmits(['changeShowAside'])

  function toggleShowActive(){
    emit('changeShowAside')
  }
</script>
<template>
  <div class="layout-header">
    <Transition name="aside-slide-in">
      <div v-show="props.showAside" class="layout-header-icon"></div>
    </Transition>
    <div class="layout-header-content">
      <icon-ep-fold class="fold-icon" @click="toggleShowActive" />
    </div>
    <div class="layout-header-right"></div>
  </div>
</template>
<style lang='scss' scoped>
@import "./layout";

.layout-header {
  height: $layout-header-height;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
  display: flex;

  .layout-header-icon {
    width: $layout-asider-width;
    height: 100%;
    border-right: 1px solid #ccc;
  }

  .layout-header-content {
    flex: 1;

    .fold-icon {
      font-size: 16px;
      cursor: pointer;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .layout-header-right {
    width: 180px;
  }
}
</style>
