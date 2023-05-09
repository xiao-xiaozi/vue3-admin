import instance from './instance';
import { convertRESTAPI } from '../util';

/** 登录接口 */
function login_post(opts) {
  return instance({
    method: 'post',
    url:  '/login',
    opts: opts
  });
}

/** 获取菜单信息以及登录用户信息 */
function userResource_get(opts) {
  return instance({
    method: 'get',
    url:  '/userResource',
    opts: opts
  });
}

/** 支持 restful 的 mock，替换 id 试试 */
function restful_id_list_get(opts) {
  return instance({
    method: 'get',
    url: convertRESTAPI('/restful/:id/list', opts),
    opts: opts
  });
}

/** 支持接口代理的 mock，试试在 url 上加 ?s={数字} */
function proxy_get(opts) {
  return instance({
    method: 'get',
    url:  '/proxy',
    opts: opts
  });
}

/** 带随机数据的 mock */
function mock_get(opts) {
  return instance({
    method: 'get',
    url:  '/mock',
    opts: opts
  });
}

/** 自定义响应的 mock */
function _get(opts) {
  return instance({
    method: 'get',
    url:  '/',
    opts: opts
  });
}

/** 这只是一个响应 post 接口返回随机数据的例子 */
function upload_post(opts) {
  return instance({
    method: 'post',
    url:  '/upload',
    opts: opts
  });
}

/** 根据请求参数返回指定数据，试试在 url 上加 ?name={任意值} */
function query_get(opts) {
  return instance({
    method: 'get',
    url:  '/query',
    opts: opts
  });
}

export {
  login_post,
  userResource_get,
  restful_id_list_get,
  proxy_get,
  mock_get,
  _get,
  upload_post,
  query_get
};
