
export namespace dto {
    export namespace responseBody {
        export class RegistrationRespBody {
            userId: string;
            wechatOpenid:string;
        }
    }
}

export import RegistrationRespBody = dto.responseBody.RegistrationRespBody;