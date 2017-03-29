import {BaseReq} from "./../base/Base";
import {PasswdResetReqBody} from "./body/PasswdResetReqBody";
export namespace dto {
    export namespace request {
        export class PasswdResetReq extends BaseReq {
            body: PasswdResetReqBody;
        }
    }
}

export import PasswdResetReq = dto.request.PasswdResetReq;
