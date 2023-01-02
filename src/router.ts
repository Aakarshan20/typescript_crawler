import {Router, Request, Response} from 'express';
import DellAnalyzer from "./dellAnalyzer";
import Crawler from './crawler';
import fs from 'fs';
import path from 'path';

// 問題1: express 庫的類型定義文件 .d.ts 文件類型描述不準確
// 解決: 對引入的具體內容做修改
interface RequestWithBody extends Request{
    body: {
        [key:string ]: string | undefined; // 接受任何為string 的key
    }
    
}

const router = Router();

router.get('/', (req: Request, res: Response)=>{
    const isLogin = req.session ? req.session.login : false;
    if(isLogin){
        res.send(`
            <html>
                <body>
                    <a href='/getData'>crawler start!</a>
                    <a href='/showData'>show data</a>
                    <a href='/logout'>退出</a>
                </body>
            </html>
        `)
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
        `)
    }
})

router.get('/logout', (req: Request, res: Response)=>{
    if(req.session){
        req.session.login = undefined;
    }
    res.redirect('/');
})

router.get('/getData', (req: RequestWithBody, res: Response)=>{
    const isLogin = req.session ? req.session.login : false;
    if(isLogin){
        const secret = "secretKey";
        const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`; // 勿斷行, superagent 讀不到
        const fileName = "course.json"; // the filename saved
        const analyzer = DellAnalyzer.getInstance();
        new Crawler(url, fileName, analyzer);
        res.send('get data success!!')
    } else {
        //res.send(`${req.teacherName} : password error!`)
        res.send(' please login!')
    }
    
})

router.get('/showData', (req: RequestWithBody, res: Response)=>{
    const isLogin = req.session ? req.session.login : false;
    if(isLogin){
        try{
            const position = path.resolve(__dirname, '../data/course.json');
            const result = fs.readFileSync(position,'utf8');
            res.json(JSON.parse(result));
        } catch(e){
            res.send('content empty');
        }
    } else {
        res.send(' please login!')
    }
    
})

router.post('/login', (req: RequestWithBody, res: Response)=>{
    //console.log(req.body)
    //once req.body is undefined, it have to install middleware 
    const {password} = req.body;
    const isLogin = req.session ? req.session.login : false;

    if(isLogin){
        res.send('You have already logged in.')
    } else {
        if(password === '123' && req.session){
            req.session.login = true;
            res.send('login success!!');
            
        } else {
            res.send('login fail!')
        }
    }
    
})

export default router;