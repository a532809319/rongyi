
export namespace dto {
    export namespace base {
        export class BaseReq {
            header: ReqHeader;
        }
        export class BaseResp {
            header: RespHeader;
        }

        export class ReqHeader {
            service: string;
            channel: string;
            deviceIp: string;
            deviceInfo: string;
            inputCharset: string;
            requestDate: string;
            requestTime: string;
            requestId: string;
        }

        export class RespHeader {
            requestDate: string;
            requestTime: string;
            requestId: string;
            respCode: string;
            respMsg: string;

        }
    }

}

export import BaseReq = dto.base.BaseReq;
export import BaseResp = dto.base.BaseResp;
export import ReqHeader = dto.base.ReqHeader;
export import RespHeader = dto.base.RespHeader;

