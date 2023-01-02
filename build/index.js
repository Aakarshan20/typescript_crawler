"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import express , {Request, Response, NextFunction}from 'express';
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_session_1 = __importDefault(require("cookie-session"));
// 問題1: express 庫的類型定義文件 .d.ts 文件類型描述不準確
// 問題2: 當我使用中間件的時候，對req, res 做了修改以後, 實際上類型並不能改變
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false })); // have to before .use(router)
// app.use((req: Request, res: Response, next:NextFunction)=>{
//     req.teacherName = 'dell'; // 因為定義了custom.d.ts 所以request的內容進行了融合
//     next();
// })
app.use((0, cookie_session_1.default)({
    name: 'session',
    keys: ['teachar dell'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(router_1.default);
app.listen(7001, () => {
    console.log('server is running');
});
