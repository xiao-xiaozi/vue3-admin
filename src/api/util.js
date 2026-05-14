import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create();

// 请求拦截器 — 从 cookie 中取出 token 附加到 Authorization 头
instance.interceptors.request.use((config) => {
  const token = Cookies.get(`vue3-admin-${APP_VERSION}-token`)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

function createAPI(baseURL) {
  return function (conf) {
    conf = conf || {};
    return instance(Object.assign({}, {
      url: conf.url,
      baseURL,
      method: conf.method
    }, conf.opts));
  };
}

instance.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  if (error.response && error.response.status === 401) {
    Cookies.remove(`vue3-admin-${APP_VERSION}-token`)
    window.location.hash = '#/login'
  }
  return Promise.reject(error)
})

function convertRESTAPI(url, opts) {
  if (!opts || !opts.path) return url;

  const pathKeys = Object.keys(opts.path);

  pathKeys.forEach((key) => {
    const r = new RegExp('(:' + key + '|{' + key + '})', 'g');
    url = url.replace(r, opts.path[key]);
  });

  return url;
}

export {
  createAPI,
  convertRESTAPI
};
