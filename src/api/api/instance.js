import { createAPI } from '../util';
import config from '../config';

const baseUrl = {
  mock: 'https://mock.mengxuegu.com/mock/63f0301fc5a76a117cab102f/example',
  dev: '',
  pre: '',
  prod: ''
}[config.env || 'mock'];

export default createAPI(baseUrl);
