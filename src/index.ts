//import express , {Request, Response, NextFunction}from 'express';
import express from 'express';
import router from './router'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session';

// 問題1: express 庫的類型定義文件 .d.ts 文件類型描述不準確
// 問題2: 當我使用中間件的時候，對req, res 做了修改以後, 實際上類型並不能改變

const app = express();
app.use(bodyParser.urlencoded({ extended: false })); // have to before .use(router)
// app.use((req: Request, res: Response, next:NextFunction)=>{
//     req.teacherName = 'dell'; // 因為定義了custom.d.ts 所以request的內容進行了融合
//     next();
// })
app.use(cookieSession({
    name: 'session',
    keys: ['teachar dell'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }))
app.use(router);

app.listen(7001, ()=>{
    console.log('server is running');
})

