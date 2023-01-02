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
    res.send('hello world!');
});
router.get('/getData', (req, res) => {
    const secret = "secretKey";
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`; // 勿斷行, superagent 讀不到
    const fileName = "course.json"; // the filename saved
    const analyzer = dellAnalyzer_1.default.getInstance();
    new crawler_1.default(url, fileName, analyzer);
    res.send('get data success!!');
});
exports.default = router;
