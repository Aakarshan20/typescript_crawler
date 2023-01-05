"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs")); // from node
// for the seek of import
var DellAnalyzer = /** @class */ (function () {
    function DellAnalyzer() {
    }
    DellAnalyzer.getInstance = function () {
        if (!DellAnalyzer.instance) {
            DellAnalyzer.instance = new DellAnalyzer();
        }
        return DellAnalyzer.instance;
    };
    DellAnalyzer.prototype.getCourseInfo = function (html) {
        var $ = cheerio_1.default.load(html); // load html text
        var courseItems = $('.course-item'); // find class named 'course-item'
        var courseInfos = []; // for parse result
        courseItems.map(function (index, element) {
            // for loop: like key-value pair
            var descs = $(element).find('.course-desc'); //find class named 'course-desc' in value
            var title = descs.eq(0).text(); // get first element and get it's text
            var count = parseInt(descs.eq(1).text().split('：')[1], 10); // similar to uppon but parse to int
            courseInfos.push({ title: title, count: count }); // add into array
        });
        return {
            time: new Date().getTime(),
            data: courseInfos,
        };
    };
    DellAnalyzer.prototype.generateJsonContent = function (courseInfo, filePath) {
        console.log(1234);
        var fileContent = {};
        console.log('filepppppppppppath::' + filePath);
        if (fs_1.default.existsSync(filePath)) {
            console.log(1235);
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
            console.log('fffffffffffffileContent::' + fileContent);
            console.log(1236);
        }
        console.log(1237);
        fileContent[courseInfo.time] = courseInfo.data;
        return fileContent;
    };
    DellAnalyzer.prototype.analyze = function (html, filePath) {
        console.log(7777777);
        var courseInfo = this.getCourseInfo(html);
        console.log(99999);
        console.log('filePath::::' + filePath);
        var fileContent = this.generateJsonContent(courseInfo, filePath);
        console.log(10000002);
        return JSON.stringify(fileContent);
    };
    return DellAnalyzer;
}());
exports.default = DellAnalyzer;
