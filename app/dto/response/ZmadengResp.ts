import {BaseResp} from "./../base/Base";
import {ZmadengRespBody} from "./body/ZmadengRespBody";
export namespace dto {
    export namespace response {
        export class ZmadengResp extends BaseResp {
            body:ZmadengRespBody;
        }
    }
}

export import ZmadengResp = dto.response.ZmadengResp;
