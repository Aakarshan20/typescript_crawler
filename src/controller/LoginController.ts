import { Request, Response } from 'express';
import 'reflect-metadata';

// 問題1: express 庫的類型定義文件 .d.ts 文件類型描述不準確
// 解決: 對引入的具體內容做修改
interface BodyRequest extends Request {
  body: {
    [key: string]: string | undefined; // 接受任何為string 的key
  };
}

function controller(target: any) {
  console.log(7777);

  console.log(target);

  console.log(target.prototype);
  for (let key in Object.getOwnPropertyNames(target.prototype)) {
    console.log(8888);
    console.log(key);
    console.log(
      Reflect.getMetadata(
        'path',
        Object.getOwnPropertyNames(target.prototype),
        key
      )
    );
  }
}

function get(path: string) {
  console.log(9999);
  return function (target: any, key: string) {
    Reflect.defineMetadata('path', path, target, key);
  };
}

@controller
class LoginController {
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
