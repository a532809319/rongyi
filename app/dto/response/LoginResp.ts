import {BaseResp} from "./../base/Base";
import {LoginRespBody} from "./body/LoginRespBody";
export namespace dto {
    export namespace response {
        export class LoginResp extends BaseResp {
            body: LoginRespBody;
        }
    }
}

export import LoginResp = dto.response.LoginResp;