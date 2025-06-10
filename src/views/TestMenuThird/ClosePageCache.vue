<script setup>
const formData = reactive({
  input: '',
  checked: []
})
</script>
<template>
  <el-form :model="formData">
    <el-form-item label="输入框">
      <el-input v-model="formData.input" placeholder="" />
    </el-form-item>
    <el-form-item label="多选框">
      <el-checkbox-group v-model="formData.checked">
        <el-checkbox :value="1">Vue</el-checkbox>
        <el-checkbox :value="2">React</el-checkbox>
        <el-checkbox :value="3">Angular</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
  </el-form>
</template>
<!-- <style lang="scss" scoped></style> -->
