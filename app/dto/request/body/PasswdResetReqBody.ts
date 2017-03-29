

export namespace dto {
    export namespace requestBody {
        export class PasswdResetReqBody {
            mobNo: string;
            userPasswd: string;
            newPasswd: string;
            verifyCode: string;
            smsVcId: string;
            smsVcDate: string;
        }
    }
}

export import PasswdResetReqBody = dto.requestBody.PasswdResetReqBody;