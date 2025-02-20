<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { api } from '@/api'
import util from "@/utils"

/*
fix: 手动引入组件会导致ElMessage组件样式丢失,
         不导入组件直接使用正常，但eslint会报错：'ElMessage' is not defined.
         通过在eslint配置global:{ ElMessage:'readonly' }  解决
*/
// import { ElMessage } from "element-plus";
const router = useRouter();
const loginFormRef = ref(null);
const formData = reactive({
  username: "admin",
  password: "admin" 
});

const rules = reactive({
  username: [{
    required: true,
    message: "请输入用户名！",
    trigger: "blur" 
  }],
  password: [{
    required: true,
    message: "请输入密码！",
    trigger: "blur" 
  }] 
});


function loginClick() {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      api.loginPost().then(({ data }) => {
        util.cookie.set('token', data.token)
        ElMessage.success("登录成功！");
      })
      setTimeout(() => {
        router.push("/index");
      }, 300)
    }
  });

}

console.log(import.meta.env.PROD)


</script>
<template>
  <div class="login-view">
    <div class="login-left">
      <h1>Login page</h1>
    </div>
    <div class="login-right">
      <div class="login-box">
        <h3>Login Form</h3>
        <el-form
          ref="loginFormRef"
          :rules="rules"
          :model="formData"
          label-position="right"
          label-width="80px"
          class="login-form">
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="formData.username"
              placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="formData.password"
              type="password"
              placeholder="请输入密码" />
          </el-form-item>
        </el-form>
        <el-button type="primary" class="login-btn" @click="loginClick">
          登录
        </el-button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login-view {
  display: flex;
  height: 100%;
  position: relative;

  .login-right {
    width: 500px;
    border-left: 1px solid #f5f5f5;
    position: relative;

    .login-box {
      width: 80%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      h3 {
        font-weight: 500;
        text-align: center;
        padding: 10px 0;
      }

      .login-btn {
        width: 320px;
        margin-left: 80px;
      }
    }
  }

  .login-left {
    flex: 1;

    h1 {
      text-align: center;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
