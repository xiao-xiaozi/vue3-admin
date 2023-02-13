<script setup>
import LayoutHeader from "./LayoutHeader.vue";
import LayoutAsider from "./LayoutAsider.vue"

</script>
<template>
  <div class="layout-component">
    <LayoutHeader />
    <LayoutAsider />
    <div class="layout-container"></div>
  </div>
</template>

<style lang="scss" scoped>
.layout-component {
  height: 100%;
}
</style>
