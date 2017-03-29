import {BaseResp} from "./../base/Base";
import {RegistrationRespBody} from "./body/RegistrationRespBody";
export namespace dto {
    export namespace response {
        export class RegistrationResp extends BaseResp {
            body: RegistrationRespBody ;
        }
    }
}

export import RegistrationResp = dto.response.RegistrationResp;