import { request, Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import { controller, use, get } from '../decorator/index';
import { getResponseData } from '../utils/util';
import Analyzer from '../utils/analyzer';
import Crawler from '../utils/crawler';
import fs from 'fs';
import path from 'path';

// 問題1: express 庫的類型定義文件 .d.ts 文件類型描述不準確
// 解決: 對引入的具體內容做修改
interface BodyRequest extends Request {
  body: {
    [key: string]: string | undefined; // 接受任何為string 的key
  };
}

const checkLogin = (req: Request, res: Response, next: NextFunction): void => {
  const isLogin = !!(req.session ? req.session.login : false); // force convert to bool type
  if (isLogin) {
    next();
  } else {
    res.json(getResponseData(false, 'please login'));
  }
};

@controller('/')
export class CrawlerController {
  @get('/getData')
  @use(checkLogin)
  getData(req: BodyRequest, res: Response): void {
    const secret = 'secretKey';
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`; // 勿斷行, superagent 讀不到
    const fileName = 'course.json'; // the filename saved
    const analyzer = Analyzer.getInstance();
    new Crawler(url, fileName, analyzer);
    res.json(getResponseData(true));
  }

  @get('/showData')
  @use(checkLogin)
  showData(req: BodyRequest, res: Response): void {
    try {
      const position = path.resolve(__dirname, '../../data/course.json');
      const result = fs.readFileSync(position, 'utf8');
      res.json(getResponseData(JSON.parse(result)));
    } catch (e) {
      res.json(getResponseData(false, 'content error!'));
    }
  }
}
