import { defineStore } from "pinia";
import { database as getDatabase, dbGet, dbSet } from "@/utils/util.db.js"

export const useLowdbStore = defineStore("lowdbStore", () => {

  /**
     * @description 将数据存储到指定位置 | 路径不存在会自动初始化
     * @description 效果类似于取值 dbName.path = value
     * @param {Object} payload dbName {String} 数据库名称
     * @param {Object} payload path {String} 存储路径
     * @param {Object} payload value {*} 需要存储的值
     * @param {Object} payload user {Boolean} 是否区分用户
  */
  function setDB({
    dbName = 'database',
    path = '',
    value = '',
    user = false
  }) {
    dbSet({
      dbName, path, value, user
    })
  }
  /**
     * @description 获取数据
     * @description 效果类似于取值 dbName.path || defaultValue
     * @param {Object} payload dbName {String} 数据库名称
     * @param {Object} payload path {String} 存储路径
     * @param {Object} payload defaultValue {*} 取值失败的默认值
     * @param {Object} payload user {Boolean} 是否区分用户
   */
  function getDB({
    dbName = 'database',
    path = '',
    defaultValue = '',
    user = false
  }) {
    return dbGet({
      dbName, path, defaultValue, user
    })
  }
  /**
     * @description 获取存储数据库对象
     * @param {Object} context
     * @param {Object} payload user {Boolean} 是否区分用户
  */
  function database({ user = false }) {
    return getDatabase({
      user,
      defaultValue: {}
    })
  }
  /**
     * @description 清空存储数据库对象
     * @param {Object} payload user {Boolean} 是否区分用户
  */
  function databaseClear({ user = false }) {
    return getDatabase({
      user,
      validator: () => false,
      defaultValue: {}
    })
  }

  return {
    setDB,
    getDB,
    database,
    databaseClear
  }
})