import {BaseReq} from "./../base/Base";
import {LoginReqBody} from "./body/LoginReqBody";
export namespace dto {
    export namespace request {
        export class LoginReq extends BaseReq{
            body:LoginReqBody; 
        }
    }
}

export import LoginReq = dto.request.LoginReq;
