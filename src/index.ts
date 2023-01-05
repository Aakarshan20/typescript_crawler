import express from 'express';
import router from './router';
import './controller/LoginController';
import './controller/CrawlerController';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

const app = express();
app.use(bodyParser.urlencoded({ extended: false })); // have to before .use(router)
// app.use((req: Request, res: Response, next:NextFunction)=>{
//     req.teacherName = 'dell'; // 因為定義了custom.d.ts 所以request的內容進行了融合
//     next();
// })
app.use(
  cookieSession({
    name: 'session',
    keys: ['teachar dell'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
app.use(router);

app.listen(7001, () => {
  console.log('server is running');
});
