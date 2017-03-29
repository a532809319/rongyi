//定义服务接口
export interface ITransformerService{
    toLowerCase(input:string):string;
    toUpperCase(input:string):string;
}

//定义一个实现
export class TransformerService implements ITransformerService{
    static count:number=0;
    constructor(){
        TransformerService.count=TransformerService.count+1;
        console.log("TransformerService created "+TransformerService.count);
    }

    toLowerCase(input:string):string{
       return input.toLowerCase();     
    }

    toUpperCase(input:string):string{
        return input.toUpperCase();
    }

}

export class TransformerService2{
    static count:number=0;
    constructor(){
        TransformerService2.count=TransformerService2.count+1;
        console.log("TransformerService2 created "+TransformerService2.count);
    }

    toLowerCase(input:string):string{
       return input.toLowerCase();     
    }

    toUpperCase(input:string):string{
        return input.toUpperCase();
    }

}

 
angular.module("helloapp.transformer",[])
.service("transformer",function(){
    return new TransformerService();
})
.factory("transformer2",function(){
    return new TransformerService2();
});
 
