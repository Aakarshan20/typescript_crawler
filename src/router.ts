/*
import fs from 'fs';
import path from 'path';
import { Router, Request, Response, NextFunction } from 'express';
import Analyzer from './utils/analyzer';
import Crawler from './utils/crawler';
import { getResponseData } from './utils/util';

// 問題1: express 庫的類型定義文件 .d.ts 文件類型描述不準確
// 解決: 對引入的具體內容做修改
interface BodyRequest extends Request {
  body: {
    [key: string]: string | undefined; // 接受任何為string 的key
  };
}

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    next();
  } else {
    res.json(getResponseData(false, 'please login'));
  }
};

const router = Router();

router.get('/', () => {});

router.get('/logout', (req: BodyRequest, res: Response) => {
  if (req.session) {
    req.session.login = undefined;
  }
  //res.redirect('/');
  res.json(getResponseData(true));
});

router.get('/getData', checkLogin, (req: BodyRequest, res: Response) => {
  const secret = 'secretKey';
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`; // 勿斷行, superagent 讀不到
  const fileName = 'course.json'; // the filename saved
  const analyzer = Analyzer.getInstance();
  new Crawler(url, fileName, analyzer);
  res.json(getResponseData(true));
});

router.get('/showData', checkLogin, (req: BodyRequest, res: Response) => {
  try {
    const position = path.resolve(__dirname, '../data/course.json');
    const result = fs.readFileSync(position, 'utf8');
    res.json(getResponseData(JSON.parse(result)));
  } catch (e) {
    res.json(getResponseData(false, 'content error!'));
  }
});

router.post('/login', (req: BodyRequest, res: Response) => {
  //console.log(req.body)
  //once req.body is undefined, it have to install middleware
  const { password } = req.body;
  const isLogin = req.session ? req.session.login : false;

  if (isLogin) {
    res.json(getResponseData(false, 'you have already logged in'));
  } else {
    if (password === '123' && req.session) {
      req.session.login = true;
      res.json(getResponseData(true));
    } else {
      res.json(getResponseData(false, 'login fail!'));
    }
  }
});

export default router;
*/
