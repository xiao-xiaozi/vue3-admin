<script setup>
import { ref } from 'vue';

const enOrDeCode = ref('')
const enOrDeCodeResult =ref('')
function encodeFn(){
  enOrDeCodeResult.value = encodeURIComponent(enOrDeCode.value)
}

function decodeFn(){
  enOrDeCodeResult.value = decodeURIComponent(enOrDeCode.value)
}

const val = ref('')
const valResult = ref('')

function atobFn() {
  valResult.value = atob(val.value)
}

function btoaFn() {
  valResult.value = btoa(val.value)
}

</script>

<template>
  <div>
    <div>
      <el-divider>encode or decode</el-divider>
      <el-input v-model="enOrDeCode" />
      <div class="encode-decode">
        <el-button type="primary" @click="encodeFn">encode</el-button>
        <el-button type="primary" @click="decodeFn">decode</el-button>
      </div>
      <el-input v-model="enOrDeCodeResult" readonly />
    </div>
    <div class="function-box">
      <el-divider>atob or btoa</el-divider>

      <el-input v-model="val" />
      <div class="encode-decode">
        <el-button type="primary" @click="atobFn">atob</el-button>
        <el-button type="primary" @click="btoaFn">btoa</el-button>
      </div>
      <el-input v-model="valResult" readonly />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.encode-decode {
  margin-top: 10px;
  margin-bottom: 10px;
}

.function-box {
  margin-top: 40px;
}
</style>
