"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var express_1 = require("express");
var analyzer_1 = __importDefault(require("./utils/analyzer"));
var crawler_1 = __importDefault(require("./utils/crawler"));
var util_1 = require("./utils/util");
var checkLogin = function (req, res, next) {
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        next();
    }
    else {
        res.json((0, util_1.getResponseData)(false, 'please login'));
    }
};
var router = (0, express_1.Router)();
router.get('/', function () { });
router.get('/logout', function (req, res) {
    if (req.session) {
        req.session.login = undefined;
    }
    //res.redirect('/');
    res.json((0, util_1.getResponseData)(true));
});
router.get('/getData', checkLogin, function (req, res) {
    var secret = 'secretKey';
    var url = "http://www.dell-lee.com/typescript/demo.html?secret=".concat(secret); // 勿斷行, superagent 讀不到
    var fileName = 'course.json'; // the filename saved
    var analyzer = analyzer_1.default.getInstance();
    new crawler_1.default(url, fileName, analyzer);
    res.json((0, util_1.getResponseData)(true));
});
router.get('/showData', checkLogin, function (req, res) {
    try {
        var position = path_1.default.resolve(__dirname, '../data/course.json');
        var result = fs_1.default.readFileSync(position, 'utf8');
        res.json((0, util_1.getResponseData)(JSON.parse(result)));
    }
    catch (e) {
        res.json((0, util_1.getResponseData)(false, 'content error!'));
    }
});
router.post('/login', function (req, res) {
    //console.log(req.body)
    //once req.body is undefined, it have to install middleware
    var password = req.body.password;
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.json((0, util_1.getResponseData)(false, 'you have already logged in'));
    }
    else {
        if (password === '123' && req.session) {
            req.session.login = true;
            res.json((0, util_1.getResponseData)(true));
        }
        else {
            res.json((0, util_1.getResponseData)(false, 'login fail!'));
        }
    }
});
exports.default = router;
