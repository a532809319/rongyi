import {BaseReq} from "./../base/Base";
import {ZmadengReqBody} from "./body/ZmadengReqBody";
export namespace dto {
    export namespace request {
        export class ZmadengReq extends BaseReq{

            body:ZmadengReqBody;
        }
    }

}

export import ZmadengReq = dto.request.ZmadengReq;
