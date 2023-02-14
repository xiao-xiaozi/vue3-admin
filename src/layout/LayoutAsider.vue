<script setup>
  const props = defineProps({
    showAside:{
      type:Boolean,
      default:true
    }
  })
</script>
<template>
  <Transition name="aside-slide-in">
    <div v-show="props.showAside" class="layout-asider"></div>
  </Transition>
</template>
<style lang='scss' scoped>
@import "./layout";

.layout-asider {
  width: $layout-asider-width;
  height: calc(100vh - $layout-header-height);
  border-right: 1px solid #ccc;
  box-sizing: border-box;
}
</style>
