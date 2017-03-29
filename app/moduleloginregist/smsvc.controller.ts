import {EasycashServicesName} from "./../services/services.module";
import {NetRequest, NetRequestCallback, NetRequestCode} from "./../services/easycash.network";
import {SmsVcReq} from "./../dto/request/SmsVcReq";

import {SmsVcResp} from "./../dto/response/SmsVcResp";
import {SmsVcRespBody} from "./../dto/response/body/SmsVcRespBody";
import {RespHeader} from "./../dto/base/Base";
import {ItemPlatform} from "../models/item.platform";
class SmsvcController {
    public itemPlatform:ItemPlatform=new ItemPlatform();
    constructor(private netRequest: NetRequest) {

    }
    doRequestVerifyCode() {
        var req: SmsVcReq = new SmsVcReq();
        req.header = this.netRequest.buildRequestHeader();

        var mobno: string ;
        this.netRequest.doRequestVerfiyCode(req, mobno, {
            onSuccess(json: any) {

                var resp: SmsVcResp = json;
                if (resp) {
                    var header = resp.header;
                    if (NetRequestCode.SUCCESS === header.respCode) {
                        var body = resp.body;
                        console.log("--------------短信验证码:" + angular.toJson(body));
                    }
                }
            },
            onFailure(e: any) {

            }

        });
    }
}
SmsvcController.$inject = [EasycashServicesName.NetRequestService];

export {SmsvcController};
