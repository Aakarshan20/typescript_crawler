"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
// for controller annotation
var router_1 = __importDefault(require("../router"));
function controller(root) {
    return function (target) {
        for (var key in target.prototype) {
            var path = Reflect.getMetadata('path', target.prototype, key);
            var method = Reflect.getMetadata('method', target.prototype, key);
            var handler = target.prototype[key];
            var middleware = Reflect.getMetadata('middleware', target.prototype, key);
            if (path && method) {
                var fullPath = root === '/' ? path : "".concat(root).concat(path);
                if (middleware) {
                    router_1.default[method](fullPath, middleware, handler); // 生成的路由存在router裡面
                }
                else {
                    router_1.default[method](fullPath, handler); // 生成的路由存在router裡面
                }
            }
        }
    };
}
exports.controller = controller;