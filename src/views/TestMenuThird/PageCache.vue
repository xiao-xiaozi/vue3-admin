<script setup>
const formData = reactive({
  username: "",
  password: '',
  radioValue: undefined
})
</script>
<template>
  <el-form :model="formData">
    <el-form-item label="用户名">
      <el-input v-model="formData.username" placeholder="" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formData.password" placeholder="" />
    </el-form-item>
    <el-form-item label="登录方式">
      <el-radio-group v-model="formData.radioValue">
        <el-radio :label="1">账号密码</el-radio>
        <el-radio :label="2">微信</el-radio>
        <el-radio :label="3">Github</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>
<!-- <style lang="scss" scoped></style> -->
