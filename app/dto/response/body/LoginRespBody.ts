
export namespace dto {
    export namespace responseBody {
        export class LoginRespBody {
            userId: string;
            authToken: string;
            wechatOpenid:string;
        }
    }
}

export import LoginRespBody = dto.responseBody.LoginRespBody;