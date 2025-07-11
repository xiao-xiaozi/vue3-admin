<script setup>
import HasPermission from '@/components/HasPermission.vue';

</script>
<template>
  <el-container>
    <HasPermission code="add">
      授权了才展示
    </HasPermission>
  </el-container>
</template>