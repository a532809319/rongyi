import {BaseReq} from "./../base/Base";
import {AppStartUpInfoReqBody} from "./body/AppStartUpInfoReqBody";
export namespace dto {
    export namespace request {
        export class AppStartUpInfoReq extends BaseReq{
            body:AppStartUpInfoReqBody;
        }
    }
}

export import AppStartUpInfoReq = dto.request.AppStartUpInfoReq;
