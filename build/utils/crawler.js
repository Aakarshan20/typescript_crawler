"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ts->.d.ts(translate file) ->js
// visit https://www.npmjs.com/package/node and search @types/[js file you wanna translate]
const superagent_1 = __importDefault(require("superagent")); // ts cannot read js file
const fs_1 = __importDefault(require("fs")); // from node
const path_1 = __importDefault(require("path")); // from node
// common logic
class Crawler {
    getRawHtml() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield superagent_1.default.get(this.url);
            return result.text;
        });
    }
    writeFile(content) {
        fs_1.default.writeFileSync(this.filePath, content);
    }
    initSpiderProcess() {
        return __awaiter(this, void 0, void 0, function* () {
            // for decoupling
            const html = yield this.getRawHtml();
            const fileContent = this.analyzer.analyze(html, this.filePath);
            this.writeFile(fileContent);
        });
    }
    constructor(url, fileName, analyzer) {
        this.url = url;
        this.fileName = fileName;
        this.analyzer = analyzer;
        this.filePath = path_1.default.resolve(__dirname, `../../data/${this.fileName}`); // generate path ../data/course.json
        this.fileName = fileName;
        this.initSpiderProcess();
    }
}
exports.default = Crawler;
// 以下代碼移至  router.ts
// const secret = "secretKey";
// const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`; // 勿斷行, superagent 讀不到
// const fileName = "course.json"; // the filename saved
// const analyzer = DellAnalyzer.getInstance();
// new Crawler(url, fileName, analyzer);
//const analyzer2 = new LeeAnalyzer();
//new Crawler(url, "fullhtml.html", analyzer2);
