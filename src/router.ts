import {Router, Request, Response} from 'express';
import DellAnalyzer from "./dellAnalyzer";
import Crawler from './crawler';

// 問題1: express 庫的類型定義文件 .d.ts 文件類型描述不準確
// 解決: 對引入的具體內容做修改
interface RequestWithBody extends Request{
    body: {
        [key:string ]: string | undefined; // 接受任何為string 的key
    }
    
}

const router = Router();

router.get('/', (req: Request, res: Response)=>{
    res.send(`
        <html>
            <body>
                <form method = "post" action = "/getData">
                    <input type = "password" name = "password">
                    <button>send </button>
                </form>
            </body>
        </html>
    `)
})

router.post('/getData', (req: RequestWithBody, res: Response)=>{
    //console.log(req.body)
    //once req.body is undefined, it have to install middleware 
    const {password} = req.body;
    if(password === '123'){
        const secret = "secretKey";
        const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`; // 勿斷行, superagent 讀不到
        const fileName = "course.json"; // the filename saved
        const analyzer = DellAnalyzer.getInstance();
        new Crawler(url, fileName, analyzer);
        res.send('get data success!!')
    } else {
        res.send(`${req.teacherName} : password error!`)
    }
    
})

export default router;