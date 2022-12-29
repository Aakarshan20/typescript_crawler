// ts->.d.ts(translate file) ->js
// visit https://www.npmjs.com/package/node and search @types/[js file you wanna translate]
import superagent from 'superagent' // ts cannot read js file


class Crawler {
    private secret = 'secretKey';
    private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;// 勿斷行, superagent 讀不到
    private rawHtml = '';
    async getRawHtml(){
        const result = await superagent.get(this.url);
        this.rawHtml = result.text;
    }
    constructor(){
        this.getRawHtml();
    }
}

const crawler = new Crawler();