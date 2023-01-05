"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("./router"));
require("./controller/LoginController");
require("./controller/CrawlerController");
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false })); // have to before .use(router)
// app.use((req: Request, res: Response, next:NextFunction)=>{
//     req.teacherName = 'dell'; // 因為定義了custom.d.ts 所以request的內容進行了融合
//     next();
// })
app.use((0, cookie_session_1.default)({
    name: 'session',
    keys: ['teachar dell'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
}));
app.use(router_1.default);
app.listen(7001, function () {
    console.log('server is running');
});
