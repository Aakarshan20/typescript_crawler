"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dellAnalyzer_1 = __importDefault(require("./dellAnalyzer"));
const crawler_1 = __importDefault(require("./crawler"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send(`
        <html>
            <body>
                <form method = "post" action = "/getData">
                    <input type = "password" name = "password">
                    <button>send </button>
                </form>
            </body>
        </html>
    `);
});
router.post('/getData', (req, res) => {
    //console.log(req.body)
    //once req.body is undefined, it have to install middleware 
    if (req.body.password === '123') {
        const secret = "secretKey";
        const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`; // 勿斷行, superagent 讀不到
        const fileName = "course.json"; // the filename saved
        const analyzer = dellAnalyzer_1.default.getInstance();
        new crawler_1.default(url, fileName, analyzer);
        res.send('get data success!!');
    }
    else {
        res.send('password error!');
    }
});
exports.default = router;
