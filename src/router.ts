import {Router, Request, Response} from 'express';
import DellAnalyzer from "./dellAnalyzer";
import Crawler from './crawler';

const router = Router();

router.get('/', (req: Request, res: Response)=>{
    res.send('hello world!')
})

router.get('/getData', (req: Request, res: Response)=>{
    const secret = "secretKey";
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`; // 勿斷行, superagent 讀不到
    const fileName = "course.json"; // the filename saved
    const analyzer = DellAnalyzer.getInstance();
    new Crawler(url, fileName, analyzer);
    res.send('get data success!!')
})

export default router;