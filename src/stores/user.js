import { defineStore } from "pinia";
import { reactive, ref } from 'vue'


export const useUserStore = defineStore('user', () => {
  let userInfo = reactive({
    name: 'admin',
    avatarUrl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK6QGdM32bNY7Qha63Pyp3HrphweuHPe4ZUvbtCr6SKaEGOFLMqLUaZXaX0hZx6xtkdiafeKqiacVpw/132' 
  })

  /**
   * 更新用户信息
   * @param {*} newUserInfo 
   */
  function setUserInfo(newUserInfo){
    Object.assign(userInfo, newUserInfo)
  }

  // 标记是否已获取权限信息（权限路由之类的）
  let hasPermissionInfo = ref(false)
  function setHasPermissionInfo(val) {
    hasPermissionInfo.value = val
  }

  // 重置所有state属性
  function resetAllState(){
    hasPermissionInfo.value = false
  }

  return {
    userInfo,
    hasPermissionInfo,
    setHasPermissionInfo,
    resetAllState,
    setUserInfo
  }
})