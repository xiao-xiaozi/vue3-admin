import { defineStore } from "pinia";
import { reactive } from 'vue'


export const useUserStore = defineStore('user', () => {
  let userInfo = reactive({
    name: 'admin',
    avatarUrl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK6QGdM32bNY7Qha63Pyp3HrphweuHPe4ZUvbtCr6SKaEGOFLMqLUaZXaX0hZx6xtkdiafeKqiacVpw/132' 
  })

  return { userInfo }
})