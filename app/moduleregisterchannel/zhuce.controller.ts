import {EasycashServicesName} from "./../services/services.module";
import {NetRequest, NetRequestCallback, NetRequestCode} from "./../services/easycash.network";
import {RegistrationReq} from "./../dto/request/RegistrationReq";
import {RegistrationReqBody} from "./../dto/request/body/RegistrationReqBody";
import {RegistrationResp} from "./../dto/response/RegistrationResp";
import {RegistrationRespBody} from "./../dto/response/body/RegistrationRespBody";
import {RespHeader} from "./../dto/base/Base";
import {DESUtil} from "./../models/des.util";
import {SmsVcReq} from "./../dto/request/SmsVcReq";
import {SmsVcResp} from "./../dto/response/SmsVcResp";
import {SmsVcRespBody} from "./../dto/response/body/SmsVcRespBody";
import {IntentCookies} from "../models/intent.cookies";
import {AclToast} from "../services/AclToast";
import {Timedown} from "../services/Timedown";
import {AclValidator} from "../services/AclValidator";
import {CommonUtil} from "../models/common.util";


class ZhuceController {

    isAgreementChecked: boolean = false;
    public agreeIcon: boolean = true;
    VerfifyCodeTextDefault: string = "点击获取";
    verifyCodeText: string;
    public agreeIconurl: string = './../../img/zhuce/h5_xuanze.png';
    userPwd: string;
    userName: string;
    verifyCode: string;
    isFinishTimedown: boolean = true;
    smsbody: SmsVcRespBody;
    constructor(private netRequest: NetRequest,
                private $state: angular.ui.IStateService,
                private $stateParams: angular.ui.IStateParamsService,
                private $ionicLoading: ionic.loading.IonicLoadingService) {
    }

    doRequestVerifyCode() {
        if (!this.isFinishTimedown) {
            return;
        }
        var ctrl = this;
        if (this.userName == null || this.userName.length == 0) {
            AclToast.toast("请填写手机号", AclToast.TOAST_SHORT, ctrl.$ionicLoading);
            return;
        }

        if (!AclValidator.checkMobileNumber(this.userName)) {
            AclToast.toast("手机号码不正确", AclToast.TOAST_SHORT, ctrl.$ionicLoading);
            return;
        }

        var req: SmsVcReq = new SmsVcReq();
        req.header = this.netRequest.buildRequestHeader();

        var mobno: string = ctrl.userName;
        this.timedown();
        this.netRequest.doRequestVerfiyCode(req, mobno, {
            onSuccess(json: any) {
                var resp: SmsVcResp = json;
                if (resp) {
                    var header = resp.header;
                    if (NetRequestCode.SUCCESS === header.respCode) {
                        ctrl.smsbody = resp.body;
                    }
                }
            },
            onFailure(e: any) {

            }

        });

    }


    //是否同意协议
    isAgree() {
        var a = this.agreeIcon = !this.agreeIcon;
        if (a) {
            this.agreeIconurl = './../../img/zhuce/h5_xuanze.png'
            this.isAgreementChecked = false
        } else {
            this.agreeIconurl = './../../img/zhuce/h5_dui_nor.png'
            this.isAgreementChecked = true
        }
    }

    //  这是定时器。
    timedown() {
        if (!this.isFinishTimedown) {
            return;
        }
        this.isFinishTimedown = false;
        var thizz = this;
        var elem = document.getElementById("ButtonVerify_Register");
        var td: Timedown = new Timedown(60, 1000, {
            onInterval(isFinished: boolean, times: number): void {

                thizz.isFinishTimedown = isFinished;
                if (isFinished) {
                    thizz.verifyCodeText = thizz.VerfifyCodeTextDefault;
                } else {
                    thizz.verifyCodeText = times + "s倒计时";
                }
                elem.innerText = thizz.verifyCodeText;
                elem.textContent = thizz.verifyCodeText;
                console.log(thizz.verifyCodeText);
            }
        });
        td.start();
    }

    commit() {

        this.doRegist(this.smsbody)
    }

    doRegist(smsbody: SmsVcRespBody) {

        var ctrl = this;
        if (!AclValidator.checkMobileNumber(this.userName)) {
            AclToast.toast("手机号码不正确", AclToast.TOAST_SHORT, ctrl.$ionicLoading);
            return;
        }
        if (!AclValidator.checkVerifyCode(this.verifyCode)) {
            AclToast.toast("验证码不正确", AclToast.TOAST_SHORT, ctrl.$ionicLoading);
            return;
        }
        if (!AclValidator.checkRegisterPwd(this.userPwd)) {
            AclToast.toast("密码格式不正确", AclToast.TOAST_SHORT, ctrl.$ionicLoading);
            return;
        }
        if (!this.isAgreementChecked) {
            AclToast.toast("请同意相关协议", AclToast.TOAST_SHORT, ctrl.$ionicLoading);
            return;
        }

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
                console.log(json);
                alert(1)
                if (resp) {
                    var header: RespHeader = resp.header;

                    if (NetRequestCode.SUCCESS === header.respCode) {
                        var body: RegistrationRespBody = resp.body;
                        AclToast.toast("恭喜您注册成功", AclToast.TOAST_SHORT, ctrl.$ionicLoading);
                        ctrl.$state.go("download");
                        if (CommonUtil.isWeixinBrowser()) {
                            var wxopenid = CommonUtil.parseWXOpenId(body.wechatOpenid);
                            if (wxopenid) {
                                var ic = IntentCookies.readCookies();
                                ic.wxid = body.wechatOpenid;
                                ic.mobno = req.body.mobNo;
                                IntentCookies.writeCookies(ic);
                            }
                        }
                    }
                }

            },
            onFailure(e: any) {
                AclToast.toast("注册失败",AclToast.TOAST_SHORT,ctrl.$ionicLoading);
            }
        });


    }

}
ZhuceController.$inject = [EasycashServicesName.NetRequestService, "$state", "$stateParams", "$ionicLoading"];
export {ZhuceController};
