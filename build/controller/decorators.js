"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.put = exports.post = exports.get = exports.use = exports.controller = exports.router = void 0;
var express_1 = require("express");
//import { RequestHandler } from 'express-serve-static-core';
exports.router = (0, express_1.Router)();
var Method;
(function (Method) {
    Method["get"] = "get";
    Method["post"] = "post";
})(Method || (Method = {}));
function controller(target) {
    for (var key in target.prototype) {
        var path = Reflect.getMetadata('path', target.prototype, key);
        var method = Reflect.getMetadata('method', target.prototype, key);
        var handler = target.prototype[key];
        var middleware = Reflect.getMetadata('middleware', target.prototype, key);
        if (path && method && handler) {
            if (middleware) {
                exports.router[method](path, middleware, handler); // 生成的路由存在router裡面
            }
            else {
                exports.router[method](path, handler); // 生成的路由存在router裡面
            }
        }
    }
}
exports.controller = controller;
function use(middleware) {
    // 能把中間件註冊到函數上 作為函數的元數據
    return function (target, key, descriptor) {
        // get reflect middleware called middleware and save to target's key
        Reflect.defineMetadata('middleware', middleware, target, key);
    };
}
exports.use = use;
function getRequestDecorator(type) {
    return function (path) {
        return function (target, key, descriptor) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        };
    };
}
exports.get = getRequestDecorator('get');
exports.post = getRequestDecorator('post');
exports.put = getRequestDecorator('put');
exports.del = getRequestDecorator('delete');
