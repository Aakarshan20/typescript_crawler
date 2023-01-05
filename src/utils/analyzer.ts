import cheerio from 'cheerio';
import fs from 'fs'; // from node

import { Analyzer } from './crawler'; // if you don't exprt default, use curly brackets

// for website www.dell-lee.com

interface Course {
  // for array
  title: string;
  count: number;
}

interface CourseResult {
  time: number;
  data: Course[];
}

interface CourseResult {
  time: number;
  data: Course[];
}

interface Content {
  [propName: number]: Course[];
}

// for the seek of import
export default class DellAnalyzer implements Analyzer {
  private static instance: DellAnalyzer;

  static getInstance() {
    if (!DellAnalyzer.instance) {
      DellAnalyzer.instance = new DellAnalyzer();
    }
    return DellAnalyzer.instance;
  }

  private constructor() {}

  private getCourseInfo(html: string) {
    const $ = cheerio.load(html); // load html text
    const courseItems = $('.course-item'); // find class named 'course-item'
    const courseInfos: Course[] = []; // for parse result

    courseItems.map((index, element) => {
      // for loop: like key-value pair
      const descs = $(element).find('.course-desc'); //find class named 'course-desc' in value
      const title = descs.eq(0).text(); // get first element and get it's text
      const count = parseInt(descs.eq(1).text().split('：')[1], 10); // similar to uppon but parse to int
      courseInfos.push({ title, count }); // add into array
    });

    return {
      time: new Date().getTime(),
      data: courseInfos,
    };
  }

  private generateJsonContent(courseInfo: CourseResult, filePath: string) {
    let fileContent: Content = {};
    if (fs.existsSync(filePath)) {
      if (fs.readFileSync(filePath, 'utf-8')) {
        fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      }
    }
    fileContent[courseInfo.time] = courseInfo.data;
    return fileContent;
  }
  public analyze(html: string, filePath: string) {
    const courseInfo = this.getCourseInfo(html);
    const fileContent = this.generateJsonContent(courseInfo, filePath);
    return JSON.stringify(fileContent);
  }
}
