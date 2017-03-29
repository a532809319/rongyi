import {BaseResp} from "./../base/Base";
import {SmsVcRespBody} from "./body/SmsVcRespBody";
export namespace dto {
    export namespace response {
        export class SmsVcResp extends BaseResp {
           body:SmsVcRespBody;
        }
    }
}

export import SmsVcResp = dto.response.SmsVcResp;