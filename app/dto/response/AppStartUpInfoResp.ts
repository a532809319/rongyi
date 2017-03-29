import {BaseResp} from "./../base/Base";
import {AppStartUpInfoRespBody} from "./body/AppStartUpInfoRespBody";
export namespace dto {
    export namespace response {
        export class AppStartUpInfoResp extends BaseResp {
            body: AppStartUpInfoRespBody;
        }
    }
}

export import AppStartUpInfoResp = dto.response.AppStartUpInfoResp;
