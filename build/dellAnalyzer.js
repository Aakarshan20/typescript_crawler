"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const fs_1 = __importDefault(require("fs")); // from node
// for the seek of import
class DellAnalyzer {
    static getInstance() {
        if (!DellAnalyzer.instance) {
            DellAnalyzer.instance = new DellAnalyzer();
        }
        return DellAnalyzer.instance;
    }
    constructor() { }
    getCourseInfo(html) {
        const $ = cheerio_1.default.load(html); // load html text
        const courseItems = $(".course-item"); // find class named 'course-item'
        const courseInfos = []; // for parse result
        courseItems.map((index, element) => {
            // for loop: like key-value pair
            const descs = $(element).find(".course-desc"); //find class named 'course-desc' in value
            const title = descs.eq(0).text(); // get first element and get it's text
            const count = parseInt(descs.eq(1).text().split("：")[1], 10); // similar to uppon but parse to int
            courseInfos.push({ title, count }); // add into array
        });
        return {
            time: new Date().getTime(),
            data: courseInfos,
        };
    }
    generateJsonContent(courseInfo, filePath) {
        let fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
        }
        fileContent[courseInfo.time] = courseInfo.data;
        return fileContent;
    }
    analyze(html, filePath) {
        const courseInfo = this.getCourseInfo(html);
        const fileContent = this.generateJsonContent(courseInfo, filePath);
        return JSON.stringify(fileContent);
    }
}
exports.default = DellAnalyzer;
