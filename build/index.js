"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const body_parser_1 = __importDefault(require("body-parser"));
// 問題1: express 庫的類型定義文件 .d.ts 文件類型描述不準確
// 問題2: 當我使用中間件的時候，對req, res 做了修改以後, 實際上類型並不能改變
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false })); // have to before .use(router)
app.use(router_1.default);
app.listen(7001, () => {
    console.log('server is running');
});
