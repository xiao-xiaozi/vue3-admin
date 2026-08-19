import instance from './instance';

/** 登录接口 */
function login_post(opts) {
  return instance({
    method: 'post',
    url: '/login',
    opts
  });
}

/** 获取菜单信息以及登录用户信息 */
function userResource_get(opts) {
  return instance({
    method: 'get',
    url: '/userResource',
    opts
  });
}

export {
  login_post,
  userResource_get
};
