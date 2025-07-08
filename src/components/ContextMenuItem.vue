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
      <IconEpBack v-if="item.icon === 'back'" />
      <IconEpRight v-else-if="item.icon==='right'" />
      <IconEpClose v-else-if="item.icon==='Close'" />
      <IconEpCircleClose v-else-if="item.icon === 'CircleClose'" />
      <div class="contextmenu-title">{{ item.title }}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.custom-contextmenu-item {
  .contextmenu-item {
    display: flex;
    padding: 8px 10px;
    margin: 0;
    font-size: 14px;
    color: #606266;
    cursor: pointer;

    .contextmenu-title {
      margin-left: 4px;
    }

    &:hover {
      background: #ecf5ff;
      color: #66b1ff;
    }
  }
}
</style>