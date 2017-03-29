import {EasycashServicesName} from "./../../services/services.module";
import {NetRequest, NetRequestCallback, NetRequestCode} from "./../../services/easycash.network";
import {PasswdResetReq} from "./../../dto/request/PasswdResetReq";
import {PasswdResetReqBody} from "./../../dto/request/body/PasswdResetReqBody";
import {PasswdResetResp} from "./../../dto/response/PasswdResetResp";
import {RespHeader} from "./../../dto/base/Base";
import {DESUtil} from "./../../models/des.util";
import {SmsvcController} from "./../smsvc.controller";
import {ItemPwdText} from "./../../models/item.pwdtext";
import {SmsVcReq} from "./../../dto/request/SmsVcReq";
import {SmsVcResp} from "./../../dto/response/SmsVcResp";
import {SmsVcRespBody} from "./../../dto/response/body/SmsVcRespBody";
import {ItemPlatform} from "../../models/item.platform";
import {ValidateUtil} from "./../../models/validate.util";


class ResetPwdController {
    public itemPlatform: ItemPlatform = new ItemPlatform();
    userPwd: string  ;
    sureUserPwd: string;
    userName: string ;
    verifyCode: string;
    isPwdVisiable: boolean = true;
    itemPwdText: ItemPwdText = ItemPwdText.ItemVisiable;

    smsVcRespBody: SmsVcRespBody;


    constructor(private netRequest: NetRequest,
                private $ionicHistory:ionic.navigation.IonicHistoryService) {

    }

    private doPasswordFind() {

        if (this.smsVcRespBody == null) {
            return;
        }
        if (ValidateUtil.OK_CHECK != ValidateUtil.checkMobile(this.userName)) {
            return;
        }
        if (ValidateUtil.OK_CHECK != ValidateUtil.checkPwd(this.userPwd, this.sureUserPwd)) {
            return;
        }
        if (ValidateUtil.OK_CHECK != ValidateUtil.checkSmsCode(this.verifyCode, this.smsVcRespBody.verifyCode)) {
            return;
        }

        var smsbody: SmsVcRespBody = this.smsVcRespBody;
        var req: PasswdResetReq = new PasswdResetReq();
        req.header = this.netRequest.buildRequestHeader();

        var body: PasswdResetReqBody = new PasswdResetReqBody();

        body.mobNo = this.userName
        body.userPasswd = this.userPwd;
        body.smsVcDate = smsbody.smsVcDate;
        body.verifyCode = smsbody.verifyCode;
        body.smsVcId = smsbody.smsVcId;

        var key = DESUtil.getPwdKey(body.mobNo);
        var message = body.userPasswd;
        var ciphertext = DESUtil.encryptByDES(message, key);
        body.userPasswd = ciphertext;
        body.newPasswd = ciphertext;

        req.body = body;
        var ctrl=this;

        this.netRequest.doPasswordFind(req, {
            onFailure(e: any) {

            },
            onSuccess(json: any) {

                var resp: PasswdResetResp = json;
                if (resp) {
                    var header: RespHeader = resp.header;
                    if (NetRequestCode.SUCCESS === header.respCode) {
                        var backView=ctrl.$ionicHistory.backView();
                        backView.go();
                        ctrl.$ionicHistory.goBack();
                        console.log("-------重设密码:" + angular.toJson(json));
                    }
                }

            }
        });
    }

    doRequestVerifyCode() {
        var ctrl = this;
        var req: SmsVcReq = new SmsVcReq();
        req.header = this.netRequest.buildRequestHeader();

        var mobno: string = ctrl.userName;
        if (ValidateUtil.OK_CHECK != ValidateUtil.checkMobile(mobno)) {
            return;
        }

        this.netRequest.doRequestVerfiyCode(req, mobno, {
            onSuccess(json: any) {

                var resp: SmsVcResp = json;
                if (resp) {
                    var header = resp.header;
                    if (NetRequestCode.SUCCESS === header.respCode) {
                        ctrl.smsVcRespBody = resp.body;
                        console.log("--------------短信验证码:" + angular.toJson(resp.body));
                    }
                }
            },
            onFailure(e: any) {

            }
        });

    }

    /**
     * 切换密码可见性
     */
    togglePwdStatus() {
        this.isPwdVisiable = !this.isPwdVisiable;

        if (this.isPwdVisiable) {
            this.itemPwdText = ItemPwdText.ItemVisiable;
        } else {
            this.itemPwdText = ItemPwdText.ItemInvisiable;
        }
    }
}

ResetPwdController.$inject = [EasycashServicesName.NetRequestService,"$ionicHistory"];
export {ResetPwdController};
