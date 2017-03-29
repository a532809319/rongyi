export namespace dto {
    export namespace entity {
        export class SmsVerifyCode {
            smsVcDate: string;
            verifyCode: string;
            smsVcId: string;
        }
    }
}

export import SmsVerifyCode = dto.entity.SmsVerifyCode;