<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()
function backToHome(){
  router.push({ path: '/' })
}
</script>
<template>
  <div class="content">
    <div class="tip-text">404 page not found</div>
    <button class="back-to-home" @click="backToHome">回到首页</button>
  </div>
</template>
<style lang='scss' scoped>
.content {
  line-height:50vh;
  text-align: center;
  .tip-text {
    font-size:40px;
    font-weight:bold;
  }
}

button {
  --bg: #e74c3c;
  --text-color: #fff;
  position: relative;
  width: 150px;
  border: none;
  background: var(--bg);
  color: var(--text-color);
  padding: 1em;
  font-weight: bold;
  text-transform: uppercase;
  transition: 0.2s;
  border-radius: 5px;
  opacity: 0.8;
  letter-spacing: 1px;
  box-shadow: #c0392b 0px 7px 2px, #000 0px 8px 5px;
  cursor:pointer;
}

button:hover {
  opacity: 1;
}

button:active {
  top: 4px;
  box-shadow: #c0392b 0px 3px 2px, #000 0px 3px 5px;
}
</style>
