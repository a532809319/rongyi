import {IntentProductDetail} from "./intent.product.detail";
import {RYStorage} from "../services/rystorage";
/**
 * Created by 79078_000 on 2016/10/8.
 */
export const key_intent_product_detail = "A";
export const key_intent_product_loweramount = "B";
export const key_intent_product_tag = "C";

export class IntentCookies {
    uid: string;      //用户ID
    wxid: string;    //微信OpenID
    mobno: string;     //用户手机号

    //传递的参数
    param: {[key: string]: any} = {};  //传递的参数


    static writeIntent(key: string, intent: any) {


        /*var c = this.readCookies();
         c.param[key] = intent;
         this.writeCookies(c);
         */
        var tmp=angular.toJson(intent);
        console.log("-----------------------------setItem:"+key+"/"+tmp);
        RYStorage.setItem(key, tmp);
    }

    static readIntent(key: string): any {
        /*  var c = this.readCookies();
         return c.param[key];
         */
        var val = RYStorage.getItem(key);
        console.log("-----------------------------getItem:"+key+"/"+val);
        return angular.fromJson(val);
    }


    static writeCookies(cookies: IntentCookies): void {
        this.clearCookies();
        const COOKIE_PREFEX = "CK=";
        document.cookie = COOKIE_PREFEX + angular.toJson(cookies);
        console.log("writeCookie---->" + document.cookie);
    }

    static readCookies(): IntentCookies {
        var cookies: IntentCookies = null;
        var str = document.cookie;
        console.log("readCookies----->src is " + str);
        if (str && str.length >= 3) {
            var dest = str.substring(3, str.length);
            console.log("readCookies----->dest is " + dest);
            if (dest != null && dest != 'null') {
                cookies = angular.fromJson(dest);
            }
        }

        console.log("readCookies----->" + str + "/" + angular.toJson(cookies));

        if (cookies == null) {
            return new IntentCookies();
        }
        return cookies;
    }

    static clearCookies() {
        var keys = document.cookie.match(/[^ =;]?(?=\=)/g);
        console.log("clearCookies------>" + angular.toJson(keys));
        if (keys) {
            for (var i = keys.length; i--;) {
                if (keys[i]) {
                    document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
                }
            }
        }
    }
}
