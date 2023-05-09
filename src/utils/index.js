// const modules = import.meta.glob('./*js')

import cookie from "./util.cookie.js"

const util = {}
// fix: 在路由前置守卫中拿不到挂载的模块
// 将工具模块绑定到util对象上
// 文件名应符合: *.moduleName.js 
// moduleName即绑定util上的属性名
// for(const path in modules) {
//   const moduleNameSplit = path.split('.')
//   modules[path]().then(mod => {
//     util[moduleNameSplit[moduleNameSplit.length - 2]] = mod.default
//   })
// }

util.cookie = cookie


export default util