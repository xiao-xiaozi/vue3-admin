<script setup>
import LayoutHeader from "./LayoutHeader.vue";
import LayoutAsider from "./LayoutAsider.vue"
import { ref } from "vue";

const showAside = ref(true)

</script>
<template>
  <div class="layout-component">
    <LayoutHeader :show-aside="showAside" @change-show-aside="showAside = !showAside" />
    <div class="layout-container">
      <LayoutAsider :show-aside="showAside" />
      <div class="layout-container-main"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-component {
  height: 100%;

  .layout-container {
    height: calc(100% - $layout-header-height);
    display: flex;

    .layout-container-main {
      flex: 1;
    }
  }
}
</style>
