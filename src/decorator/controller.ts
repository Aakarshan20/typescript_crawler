// for controller annotation
import router from '../router';
import { RequestHandler } from 'express';
import { Methods } from './request';

export function controller(root: string) {
  return function (target: new (...args: any[]) => any) {
    for (let key in target.prototype) {
      const path: string = Reflect.getMetadata('path', target.prototype, key);
      const method: Methods = Reflect.getMetadata(
        'method',
        target.prototype,
        key
      );
      const handler = target.prototype[key];
      const middlewares: RequestHandler[] = Reflect.getMetadata(
        'middlewares',
        target.prototype,
        key
      );

      if (path && method) {
        const fullPath = root === '/' ? path : `${root}${path}`;
        if (middlewares && middlewares.length) {
          router[method](fullPath, ...middlewares, handler); // 生成的路由存在router裡面
        } else {
          router[method](fullPath, handler); // 生成的路由存在router裡面
        }
      }
    }
  };
}
