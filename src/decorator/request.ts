// for get, post, put, del.. annotations

import { LoginController, CrawlerController } from '../controller/index';

export enum Methods {
  get = 'get',
  post = 'post',
}

function getRequestDecorator(type: Methods) {
  return function (path: string) {
    return function (target: CrawlerController | LoginController, key: string) {
      Reflect.defineMetadata('path', path, target, key);
      Reflect.defineMetadata('method', type, target, key);
    };
  };
}

export const get = getRequestDecorator(Methods.get);
export const post = getRequestDecorator(Methods.post);
// export const put = getRequestDecorator(Methods.put);
// export const del = getRequestDecorator(Methods.delete);
