import { Router } from 'express';

export const router = Router();

enum Method {
  get = 'get',
  post = 'post',
}

export function controller(target: any) {
  for (let key in target.prototype) {
    const path = Reflect.getMetadata('path', target.prototype, key);
    const method: Method = Reflect.getMetadata('method', target.prototype, key);
    const handler = target.prototype[key];
    if (path && method && handler) {
      router[method](path, handler); // 生成的路由存在router裡面
    }
  }
}

function getRequestDecorator(type: string) {
  return function get(path: string) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
      Reflect.defineMetadata('path', path, target, key);
      Reflect.defineMetadata('method', type, target, key);
    };
  };
}

export const get = getRequestDecorator('get');
export const post = getRequestDecorator('post');
export const put = getRequestDecorator('put');
export const del = getRequestDecorator('delete');
