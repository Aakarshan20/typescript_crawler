"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dellAnalyzer_1 = __importDefault(require("./dellAnalyzer"));
const crawler_1 = __importDefault(require("./crawler"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.send(`
            <html>
                <body>
                    <a href='/getData'>crawler start!</a>
                    <a href='/showData'>show data</a>
                    <a href='/logout'>退出</a>
                </body>
            </html>
        `);
    }
    else {
        res.send(`
            <html>
                <body>
                    <form method = "post" action = "/login">
                        <input type = "password" name = "password">
                        <button>login</button>
                    </form>
                </body>
            </html>
        `);
    }
});
router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.login = undefined;
    }
    res.redirect('/');
});
router.get('/getData', (req, res) => {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        const secret = "secretKey";
        const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`; // 勿斷行, superagent 讀不到
        const fileName = "course.json"; // the filename saved
        const analyzer = dellAnalyzer_1.default.getInstance();
        new crawler_1.default(url, fileName, analyzer);
        res.send('get data success!!');
    }
    else {
        //res.send(`${req.teacherName} : password error!`)
        res.send(' please login!');
    }
});
router.get('/showData', (req, res) => {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        try {
            const position = path_1.default.resolve(__dirname, '../data/course.json');
            const result = fs_1.default.readFileSync(position, 'utf8');
            res.json(JSON.parse(result));
        }
        catch (e) {
            res.send('content empty');
        }
    }
    else {
        res.send(' please login!');
    }
});
router.post('/login', (req, res) => {
    //console.log(req.body)
    //once req.body is undefined, it have to install middleware 
    const { password } = req.body;
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.send('You have already logged in.');
    }
    else {
        if (password === '123' && req.session) {
            req.session.login = true;
            res.send('login success!!');
        }
        else {
            res.send('login fail!');
        }
    }
});
exports.default = router;
