import Cookies from "js-cookie"

const cookies = {}

const cookiePrefix = 'vue3-admin'

/**
 * 存储 cookie 值
 * @param {*} name 
 * @param {*} value 
 * @param {*} cookieSetting 
 */
cookies.set = function(name = 'default', value = '', cookieSetting = { expires: 1 }) {
  Cookies.set(`${cookiePrefix}-${APP_VERSION}-${name}`, value, cookieSetting)
}

/**
 * 拿到 cookie 值
 * @param {*} name 
 * @returns 
 */
cookies.get = function(name = 'default') {
  return Cookies.get(`${cookiePrefix}-${APP_VERSION}-${name}`)
}

/**
 * 拿到 cookie 全部的值
 * @returns 
 */
cookies.getAll = function() {
  return Cookies.get()
}

/**
 * 删除 cookie
 * @param {*} name 
 * @returns 
 */
cookies.remove = function(name = 'default'){
  return Cookies.remove(`${cookiePrefix}-${APP_VERSION}-${name}`)
}

export default cookies