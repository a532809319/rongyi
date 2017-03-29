import {BaseReq} from "./../base/Base";
import {RegistrationReqBody} from "./body/RegistrationReqBody";
export namespace dto {
    export namespace request {
        export class RegistrationReq extends BaseReq {
            body: RegistrationReqBody;
        }
    }
}

export import RegistrationReq = dto.request.RegistrationReq;