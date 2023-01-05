"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
function use(middleware) {
    // 能把中間件註冊到函數上 作為函數的元數據
    return function (target, key) {
        // get reflect middleware called middleware and save to target's key
        var originMiddlewares = Reflect.getMetadata('middlewares', target, key) || [];
        originMiddlewares.push(middleware);
        Reflect.defineMetadata('middlewares', originMiddlewares, target, key);
    };
}
exports.use = use;
