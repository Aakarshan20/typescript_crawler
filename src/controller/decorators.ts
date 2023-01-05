import { Router, RequestHandler } from 'express';
//import { RequestHandler } from 'express-serve-static-core';

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
    const middleware = Reflect.getMetadata('middleware', target.prototype, key);
    if (path && method && handler) {
      if (middleware) {
        router[method](path, middleware, handler); // 生成的路由存在router裡面
      } else {
        router[method](path, handler); // 生成的路由存在router裡面
      }
    }
  }
}

export function use(middleware: RequestHandler) {
  // 能把中間件註冊到函數上 作為函數的元數據
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    // get reflect middleware called middleware and save to target's key
    Reflect.defineMetadata('middleware', middleware, target, key);
  };
}

function getRequestDecorator(type: string) {
  return function (path: string) {
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
