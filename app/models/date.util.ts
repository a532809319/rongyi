
export const DTFMT_YMD_SPLIT="DTFMT_YMD_SPLIT"; 
export const DTFMT_YMD_ZERO="DTFMT_YMD_ZERO";
export const DTFMT_HMS_SPLIT="DTFMT_HMS_SPLIT";
export const DTFMT_HMS_ZERO="DTFMT_HMS_ZERO";

export class DateUtil{
 static newDate():Date{
            return new Date();
 }

 static dateFormat(fmt:string,split:string):string{
     var curDate=new Date();

     if(DTFMT_HMS_SPLIT===fmt){
         return  curDate.getHours() +split+
                 curDate.getMinutes() +split+
                 curDate.getSeconds() ;
     }else if(DTFMT_HMS_ZERO===fmt){
                return this.fillZero(curDate.getHours())+split+
                this.fillZero(curDate.getMinutes())+split+
                this.fillZero(curDate.getSeconds());
     }else if(DTFMT_YMD_SPLIT===fmt){
            return  curDate.getFullYear() +split+
                    curDate.getMonth() +split+
                    curDate.getDay() ;
     }else if(DTFMT_YMD_ZERO===fmt){
            return this.fillZero(curDate.getFullYear())+split+
                   this.fillZero(curDate.getMonth())+split+
                   this.fillZero(curDate.getDay());
     }
     return "";
 }

 private static fillZero(val:number):string{
     if(val>=10){
         return ""+val;
     } 
     return "0"+val;
 }

 static test():void{
     var infos=this.dateFormat(DTFMT_YMD_SPLIT,"/")+",";
     infos=infos+this.dateFormat(DTFMT_YMD_ZERO,"-")+",";
     infos=infos+this.dateFormat(DTFMT_HMS_SPLIT,"/")+",";
     infos=infos+this.dateFormat(DTFMT_HMS_ZERO,"-")+",";
     console.log("日期格式测试:"+infos);
 }
}