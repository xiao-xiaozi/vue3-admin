import * as transformApi from './api';
import { camelCase } from "lodash"

const api = Object.keys(transformApi).reduce((res,key) => {
  res[camelCase(key)] = transformApi[key]
  return res
}, {})

export { api };
