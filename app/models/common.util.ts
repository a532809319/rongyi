import {Constants} from "./constants";

/**
 * Created by 79078_000 on 2016/9/19.
 */

class CommonUtil {
    /*微信内置浏览器*/
    static isWeixinBrowser(): boolean {
         if(Constants.IS_DEBUG_MODE){
            return true;
        }
        var ua = window.navigator.userAgent.toLowerCase();
        var isWeixin = ua.indexOf('micromessenger') != -1;
        console.log("-----isWeixin:" + isWeixin);
        return isWeixin;
    }

    static parseWeixinAuthcode(): string {
        if(Constants.IS_DEBUG_MODE){
            return "test-wx-auth-code";
        }
        if(!this.isWeixinBrowser()){
            return null;
        }
        var location = window.location.search;
        if (location && location.indexOf("&") != -1 && location.indexOf("code=") != -1) {
            var start = location.indexOf("code=") + 5;
            var end = location.lastIndexOf("&");

            var code = location.substring(start, end);
            console.log("微信AuthCode 为 "+code);
            return code;
        }
        return null;
    }

    static parseWXOpenId(str:string):string{
        if(str==null||str.indexOf("errcode")>-1){
            return null;
        }
        return str;
    }
}
export {CommonUtil};


