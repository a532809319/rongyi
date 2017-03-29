import {LoginRespBody} from "./../dto/response/body/LoginRespBody";
import {IntentCookies} from "./intent.cookies";
/**
 * Created by 79078_000 on 2016/9/18.
 */

export class LoginStatus {
    private loginRespBody:LoginRespBody=null;

    static isLogin(): boolean {

        var ic=IntentCookies.readCookies();
        if(ic==null){
            return false;
        }
        if(ic.wxid==null){
            return false;
        }
        return true;
    }

    setLoginRespBody(body:LoginRespBody){
        this.loginRespBody=body;
    }

    getLoginRespBody():LoginRespBody{
        return this.loginRespBody;
    }

}
