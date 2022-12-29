// ts->.d.ts(translate file) ->js
// visit https://www.npmjs.com/package/node and search @types/[js file you wanna translate]
import superagent from 'superagent' // ts cannot read js file
import cheerio from 'cheerio'

interface Course {// for array
    title: string;
    count: number;
}

class Crawler {
    private secret = 'secretKey';
    private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;// 勿斷行, superagent 讀不到
    
    getCourseInfo(html: string){
        const $ = cheerio.load(html); // load html text
        const courseItems = $('.course-item'); // find class named 'course-item'
        const courseInfos: Course[]= []; // for parse result

        courseItems.map((index, element)=>{ // for loop: like key value pair
            const descs = $(element).find('.course-desc'); //find class named 'course-desc' in value
            const title = descs.eq(0).text();// get first element and get it's text
            const count = parseInt(descs.eq(1).text().split('：')[1], 10); // similar to uppon but parse to int
            courseInfos.push({title, count});  // add into array
        })
        
        const result = {
            time: new Date().getTime(),
            data: courseInfos
        }
        console.log(result)

    }

    async getRawHtml(){
        const result = await superagent.get(this.url);
        this.getCourseInfo(result.text) ;
    }
    constructor(){
        this.getRawHtml();
    }
}

const crawler = new Crawler();