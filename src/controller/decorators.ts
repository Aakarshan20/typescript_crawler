import { Router } from 'express';

export const router = Router(); 

export function controller(target: any) {
    for (let key in target.prototype) {
        const path = Reflect.getMetadata('path',target.prototype,key);
        const handler = target.prototype[key];
        if(path){
            router.get(path, handler); // 生成的路由存在router裡面
        }
    }
}
  
export function get(path: string){
    return function (target: any, key:string , descriptor: PropertyDescriptor ){
        Reflect.defineMetadata('path', path, target, key);
    }
}