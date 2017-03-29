export namespace dto {
    export namespace requestBody {
        export class LoginReqBody {
            mobNo: string;
            userPasswd: string;
            verifyCode: string;
            smsVcId: string;
          
        }
    }
}

export import LoginReqBody = dto.requestBody.LoginReqBody;
