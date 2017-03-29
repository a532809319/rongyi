
import {BaseResp} from "./../base/Base";
import {WechatOpenIdRespBody} from "./body/WechatOpenIdRespBody";
export namespace dto {
    export namespace response {
        export class WechatOpenIdResp extends BaseResp {
           body:WechatOpenIdRespBody;
        }
    }
}

export import WechatOpenIdResp = dto.response.WechatOpenIdResp;
