// ts->.d.ts(translate file) ->js
// visit https://www.npmjs.com/package/node and search @types/[js file you wanna translate]
import superagent from 'superagent'; // ts cannot read js file
import fs from 'fs'; // from node
import path from 'path'; // from node

import DellAnalyzer from './analyzer';
import LeeAnalyzer from '../leeAnalyzer';

export interface Analyzer {
  analyze: (html: string, filePath: string) => string;
}

// common logic
class Crawler {
  private filePath = path.resolve(__dirname, `../../data/${this.fileName}`); // generate path ../data/course.json

  private async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  private writeFile(content: string) {
    console.log('===================>' + this.filePath);
    fs.writeFileSync(this.filePath, content);
  }

  private async initSpiderProcess() {
    console.log(88888999);
    // for decoupling
    const html = await this.getRawHtml();
    console.log('html:::' + html);
    const fileContent = this.analyzer.analyze(html, this.filePath);
    console.log('content--------------->' + fileContent);
    this.writeFile(fileContent);
  }
  constructor(
    private url: string,
    private fileName: string,
    private analyzer: Analyzer
  ) {
    this.fileName = fileName;
    console.log('this.fileName:::' + this.fileName);
    console.log('this.analyzer:::' + this.analyzer);
    this.initSpiderProcess();
  }
}

export default Crawler;

// 以下代碼移至  router.ts
// const secret = "secretKey";
// const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`; // 勿斷行, superagent 讀不到
// const fileName = "course.json"; // the filename saved

// const analyzer = DellAnalyzer.getInstance();
// new Crawler(url, fileName, analyzer);
//const analyzer2 = new LeeAnalyzer();
//new Crawler(url, "fullhtml.html", analyzer2);
