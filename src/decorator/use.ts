// for use(middleware) annotations
import { LoginController, CrawlerController } from '../controller/index';

import { RequestHandler } from 'express';

export function use(middleware: RequestHandler) {
  // 能把中間件註冊到函數上 作為函數的元數據
  return function (target: LoginController | CrawlerController, key: string) {
    // get reflect middleware called middleware and save to target's key
    Reflect.defineMetadata('middleware', middleware, target, key);
  };
}
