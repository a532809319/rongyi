import {EasycashServicesName} from "./../../services/services.module";
import {NetRequest, NetRequestCallback, NetRequestCode} from "./../../services/easycash.network";
import {RegistrationReq} from "./../../dto/request/RegistrationReq";
import {RegistrationReqBody} from "./../../dto/request/body/RegistrationReqBody";
import {RegistrationResp} from "./../../dto/response/RegistrationResp";
import {RegistrationRespBody} from "./../../dto/response/body/RegistrationRespBody";
import {RespHeader} from "./../../dto/base/Base";
import {DESUtil} from "./../../models/des.util";
import {SmsvcController} from "./../smsvc.controller";

import {SmsVcReq} from "./../../dto/request/SmsVcReq";
import {SmsVcResp} from "./../../dto/response/SmsVcResp";
import {SmsVcRespBody} from "./../../dto/response/body/SmsVcRespBody";
import {Constants} from "../../models/constants";

import {ItemPwdText} from "./../../models/item.pwdtext";
import {IntentRegist} from "../../models/intent.regist";
import {DATA} from "../../models/intent.parammodel";
import {IntentCookies} from "../../models/intent.cookies";
import {CommonUtil} from "../../models/common.util";
import {ItemPlatform} from "../../models/item.platform";


class RegistController {
    public itemPlatform:ItemPlatform=new ItemPlatform();
    userPwd: string  ;
    userName: string  ;
    verifyCode: string;


    isPwdVisiable = false;
    itemPwdText: ItemPwdText = ItemPwdText.ItemInvisiable;
    smsbody: SmsVcRespBody;

    private intentRegist: IntentRegist;

    constructor(private netRequest: NetRequest,
                private $state: angular.ui.IStateService,
                private $stateParams: angular.ui.IStateParamsService) {
        this.intentRegist = this.$stateParams[DATA];
        console.log("------注册参数:" + (this.intentRegist == null) + angular.toJson(this.intentRegist));
    }

    private doRegist(smsbody: SmsVcRespBody) {

        if (!smsbody) {
            return;
        }
        if (!this.verifyCode || (smsbody.verifyCode != this.verifyCode)) {
            return;
        }
        if (!this.userName||this.userName.length!=11) {
            return;
        }
        if (!this.userPwd) {
            return;
        }

        console.log("-------------测试注册");
        var req: RegistrationReq = new RegistrationReq();
        req.header = this.netRequest.buildRequestHeader();

        var body = new RegistrationReqBody();
        body.mobNo = this.userName;
        body.userPasswd = this.userPwd;
        body.smsVcDate = smsbody.smsVcDate;
        body.verifyCode = smsbody.verifyCode;
        body.smsVcId = smsbody.smsVcId;
        req.body = body;


        var key = DESUtil.getPwdKey(req.body.mobNo);
        var message = req.body.userPasswd;
        var ciphertext = DESUtil.encryptByDES(message, key);


        req.body.userPasswd = ciphertext;
        this.netRequest.doRegist(req, {
            onSuccess(json: any) {

                var resp: RegistrationResp = json;
                console.log("------------注册?" + angular.toJson(resp));
                if (resp) {
                    var header: RespHeader = resp.header;
                    if (NetRequestCode.SUCCESS === header.respCode) {
                        var body: RegistrationRespBody = resp.body;

                        if (CommonUtil.isWeixinBrowser()) {
                            var wxopenid = CommonUtil.parseWXOpenId(body.wechatOpenid);
                            if (wxopenid) {
                                var ic = IntentCookies.readCookies();
                                ic.wxid = body.wechatOpenid;
                                ic.mobno=req.body.mobNo;
                                IntentCookies.writeCookies(ic);
                            }
                        }
                    }
                }

            },
            onFailure(e: any) {
                console.log("------------注册失败" + e);
            }
        });


    }

    doRequestVerifyCode() {
        console.log("--------获取验证码中");
        var ctrl = this;
        var req: SmsVcReq = new SmsVcReq();
        req.header = this.netRequest.buildRequestHeader();

        var mobno: string = ctrl.userName;
        if (!mobno||mobno.length!=11) {
            return;
        }
        this.netRequest.doRequestVerfiyCode(req, mobno, {
            onSuccess(json: any) {

                var resp: SmsVcResp = json;
                if (resp) {
                    var header = resp.header;
                    if (NetRequestCode.SUCCESS === header.respCode) {
                        ctrl.smsbody = resp.body;
                        console.log("--------------短信验证码:" + angular.toJson(resp.body));

                    }
                }
            },
            onFailure(e: any) {

            }

        });

    }

    //切换 密码可见性
    togglePwdStatus() {
        this.isPwdVisiable = !this.isPwdVisiable;

        if (this.isPwdVisiable) {
            this.itemPwdText = ItemPwdText.ItemVisiable;
        } else {
            this.itemPwdText = ItemPwdText.ItemInvisiable;
        }
    }

    submitRegistInfo() {
        this.doRegist(this.smsbody);
    }
}
RegistController.$inject = [EasycashServicesName.NetRequestService, "$state", "$stateParams"];
export {RegistController};
