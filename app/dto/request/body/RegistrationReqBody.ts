
export namespace dto {
    export namespace requestBody {
        export class RegistrationReqBody {
            mobNo: string;
            name: string;
            userPasswd: string;
            verifyCode: string;
            smsVcId: string;
            invitationCode: string;
            channel: string;
            marketingChannel: string;
            smsVcDate: string;
        }
    }
}

export import RegistrationReqBody = dto.requestBody.RegistrationReqBody;