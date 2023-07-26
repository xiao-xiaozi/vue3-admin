<script setup>
defineProps({
  menuList: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['rowClick'])

function rowClick(event){
  let target = event.target
  while (!target.dataset.value) {
    target = target.parentNode
  }
  emits('rowClick', target.dataset.value)
}

</script>
<template>
  <div class="custom-contextmenu-item" @click="rowClick">
    <div
      v-for="item in menuList"
      :key="item.value"
      :data-value="item.value"
      class="contextmenu-item">
      <!-- Todo：加上icon -->
      <div class="contextmenu-title">{{ item.title }}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.custom-contextmenu-item {
  .contextmenu-item {
    padding: 8px 20px 8px 15px;
    margin: 0;
    font-size: 14px;
    color: #606266;
    cursor: pointer;

    &:hover {
      background: #ecf5ff;
      color: #66b1ff;
    }
  }
}
</style>