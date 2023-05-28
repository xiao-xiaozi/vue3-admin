import { LowSync } from "lowdb";
import { LocalStorage } from "lowdb/browser"
import { cloneDeep } from "lodash";
import packageJson from "../../package.json"
import { useUserStore } from "@/stores/user";

const { name, version } = packageJson
// const adapter = new LocalStorage(`${name}-${version}`)
// const db = new Low(adapter)
const db = new LowSync(new LocalStorage(`${name}-${version}`))
// db.data = { sys: {}, database: {}}
// db.data = JSON.parse(localStorage.getItem(`${name}-${version}`))
db.data ||= db.adapter.read()  


/**
 * @description 检查路径是否存在 不存在的话初始化
 * @param {Object} payload dbName {String} 数据库名称
 * @param {Object} payload path {String} 路径
 * @param {Object} payload user {Boolean} 区分用户
 * @param {Object} payload validator {Function} 数据校验钩子 返回 true 表示验证通过
 * @param {Object} payload defaultValue {*} 初始化默认值
 * @returns {String} 可以直接使用的路径
*/
export async function pathInit({
  dbName = 'database',
  path = '',
  user = true,
  validator = () => true,
  defaultValue = ''
}) {
  const userStore = useUserStore()
  // 根据cookie中的uuid做用户隔离
  // const uuid = util.cookie.get('uuid') || 'ghost-uuid'
  // 修改为在sotre中获取uuid
  const uuid = userStore.userInfo.uuid || 'ghost-uui'
  const currentPath = `${dbName}.${user ? `user.${uuid}` : 'public'}${path ? `.${path}` : ''}`
  // const value = db.get(currentPath).value()
  const value = db.data[currentPath]
  // db无值或validator返回false 时，初始化/重置db
  if(!(value !== undefined && validator(value))) {
    // db.set(currentPath, defaultValue).write()
    db.data[currentPath] = defaultValue
    db.write()
  }
  return currentPath
}



/**
 * @description 将数据存储到指定位置 | 路径不存在会自动初始化
 * @description 效果类似于取值 dbName.path = value
 * @param {Object} payload dbName {String} 数据库名称
 * @param {Object} payload path {String} 存储路径
 * @param {Object} payload value {*} 需要存储的值
 * @param {Object} payload user {Boolean} 是否区分用户
 */
export async function dbSet({
  dbName = 'database',
  path = '',
  value = '',
  user = false
}){
  // db.set(pathInit({
  //   dbName,
  //   path,
  //   user
  // }), value).write()
  db.data[await pathInit({
    dbName, path, user, defaultValue: value 
  })] = value
  db.write()
}

/**
 * @description 获取数据
 * @description 效果类似于取值 dbName.path || defaultValue
 * @param {Object} payload dbName {String} 数据库名称
 * @param {Object} payload path {String} 存储路径
 * @param {Object} payload defaultValue {*} 取值失败的默认值
 * @param {Object} payload user {Boolean} 是否区分用户
 */
export async function dbGet({
  dbName = 'database',
  path = '',
  defaultValue = '',
  user = false
}){
  // return cloneDeep(db.get(pathInit({
  //   dbName,
  //   path,
  //   user,
  //   defaultValue
  // })).value())
  return cloneDeep(db.data[await pathInit({ 
    dbName,
    path,
    defaultValue,
    user
  })])
}

/**
 * @description 获取存储数据库对象
 * @param {Object} payload user {Boolean} 是否区分用户
 */
export async function database ({
  dbName = 'database',
  path = '',
  user = false,
  validator = () => true,
  defaultValue = ''
} = {}) {
  // return db.get(pathInit({
  //   dbName, path, user, validator, defaultValue
  // }))
  return db.data[await pathInit({
    dbName,
    path,
    user,
    validator,
    defaultValue
  })]
}


// db.defaults({
//   sys: {},
//   database: {}
// }).write()

export default db