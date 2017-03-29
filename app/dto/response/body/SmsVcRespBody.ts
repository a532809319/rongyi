import {SmsVerifyCode} from "./../../entity/SmsVerifyCode";
export namespace dto {
    export namespace responseBody {
        export class SmsVcRespBody extends SmsVerifyCode {
            mobNo: string;
        }
    }
}

export import SmsVcRespBody = dto.responseBody.SmsVcRespBody;