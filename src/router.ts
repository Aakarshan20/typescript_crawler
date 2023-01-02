import {Router, Request, Response} from 'express';
import DellAnalyzer from "./dellAnalyzer";
import Crawler from './crawler';

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

router.post('/getData', (req: Request, res: Response)=>{
    //console.log(req.body)
    //once req.body is undefined, it have to install middleware 

    if(req.body.password === '123'){
        const secret = "secretKey";
        const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`; // 勿斷行, superagent 讀不到
        const fileName = "course.json"; // the filename saved
        const analyzer = DellAnalyzer.getInstance();
        new Crawler(url, fileName, analyzer);
        res.send('get data success!!')
    } else {
        res.send('password error!')
    }
    
})

export default router;