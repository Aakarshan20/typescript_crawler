// ts->.d.ts(translate file) ->js
// visit https://www.npmjs.com/package/node and search @types/[js file you wanna translate]
import superagent from "superagent"; // ts cannot read js file
import cheerio from "cheerio";

import fs from "fs"; // from node
import path from "path"; // from node

interface Course {
  // for array
  title: string;
  count: number;
}

interface CourseResult {
  time: number;
  data: Course[];
}

interface Content {
  [propName: number]: Course[];
}

class Crawler {
  private secret = "secretKey";
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`; // 勿斷行, superagent 讀不到

  getCourseInfo(html: string) {
    const $ = cheerio.load(html); // load html text
    const courseItems = $(".course-item"); // find class named 'course-item'
    const courseInfos: Course[] = []; // for parse result

    courseItems.map((index, element) => {
      // for loop: like key value pair
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

  async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  generateJsonContent(courseInfo: CourseResult) {
    const filePath = path.resolve(__dirname, "../data/course.json"); // generate path ../data/course.json
    let fileContent: Content = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
    fileContent[courseInfo.time] = courseInfo.data;
    console.log(fileContent);
    fs.writeFileSync(filePath, JSON.stringify(fileContent));
  }

  async initSpiderProcess() {
    // for decoupling
    const html = await this.getRawHtml();
    const courseInfo = this.getCourseInfo(html);
    this.generateJsonContent(courseInfo);
  }
  constructor() {
    this.initSpiderProcess();
  }
}

const crawler = new Crawler();
