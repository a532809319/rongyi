export namespace dto {
    export namespace requestBody {
        export class AppStartUpInfoReqBody {
                platform:string;
                channel:string;
                appName:string;
        }
    }
}

export import AppStartUpInfoReqBody = dto.requestBody.AppStartUpInfoReqBody;
