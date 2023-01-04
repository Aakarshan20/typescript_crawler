import { request, Request, Response } from 'express';
import 'reflect-metadata';
import { get, controller } from './decorators';
import { getResponseData } from '../utils/util';

// 問題1: express 庫的類型定義文件 .d.ts 文件類型描述不準確
// 解決: 對引入的具體內容做修改
interface BodyRequest extends Request {
  body: {
    [key: string]: string | undefined; // 接受任何為string 的key
  };
}

@controller
class LoginController {
  @get('/logout')
  logout(req: BodyRequest, res: Response){
    if (req.session) {
      req.session.login = undefined;
    }
    //res.redirect('/');
    res.json(getResponseData(true));
  }
  @get('/')
  home(req: BodyRequest, res: Response) {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
      res.send(`
          <html>
              <body>
                  <a href='/getData'>crawler start!</a>
                  <a href='/showData'>show data</a>
                  <a href='/logout'>退出</a>
              </body>
          </html>
      `);
    } else {
      res.send(`
          <html>
              <body>
                  <form method = "post" action = "/login">
                      <input type = "password" name = "password">
                      <button>login</button>
                  </form>
              </body>
          </html>
      `);
    }
  }
}
