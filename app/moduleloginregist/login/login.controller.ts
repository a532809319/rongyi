import {EasycashServicesName} from "./../../services/services.module";
import {NetRequest, NetRequestCallback, NetRequestCode} from "./../../services/easycash.network";
import {LoginReq} from "./../../dto/request/LoginReq";
import {LoginReqBody} from "./../../dto/request/body/LoginReqBody";
import {LoginResp} from "./../../dto/response/LoginResp";
import {LoginRespBody} from "./../../dto/response/body/LoginRespBody";
import {RespHeader} from "./../../dto/base/Base";
import {DESUtil} from "./../../models/des.util";
import {RegistController} from "./../regist/regist.controller";
import {ResetPwdController} from "./../pwdreset/resetpwd.controller";
import {ItemPwdText} from "./../../models/item.pwdtext";
import {IntentLogin} from "../../models/intent.login";
import {DATA, IntentParamModel} from "../../models/intent.parammodel";
import {IntentRegist} from "../../models/intent.regist";
import {CommonUtil} from "../../models/common.util";
import {AppStatusService} from "../../services/app.status.service";
import {Constants} from "../../models/constants";
import {IntentCookies} from "../../models/intent.cookies";
import {JsonCmdId} from "../../nativepage/impl/json.cmdid";
import {JsonNativeSender} from "../../nativepage/impl/json.native.sender";
import {JsonParam103} from "../../nativepage/impl/json.param.103";
import {ItemPlatform} from "../../models/item.platform";

class LoginController {
    public itemPlatform:ItemPlatform=new ItemPlatform();
    userPwd: string = "12345678";
    userName: string = "15077830024";
    isPwdVisiable = false;
    itemPwdText: ItemPwdText = ItemPwdText.ItemInvisiable;

    private intentLogin: IntentLogin = null;

    constructor(private netRequest: NetRequest,
                private appStatusService: AppStatusService,
                private $ionicHistory: ionic.navigation.IonicHistoryService,
                private $state: angular.ui.IStateService,
                private $stateParams: angular.ui.IStateParamsService,
                private $loading: ionic.loading.IonicLoadingService,
                private $ionicNavBarDelegate: ionic.navigation.IonicNavBarDelegate) {


        if (this.$stateParams) {
            this.intentLogin = this.$stateParams[DATA];
        }


        console.log("----------------登录参数:" + (this.$stateParams == null) + angular.toJson(this.intentLogin));

        //获取wxopenid
        this.netRequest.doGetWXOpenId(null);
    }

    //用户登录
    doLogin() {
        var ctrl = this;

        if (!ctrl.userName) {
            return;
        }

        if (!ctrl.userPwd) {
            return;
        }

        var req: LoginReq = new LoginReq();
        var body: LoginReqBody = new LoginReqBody();
        body.mobNo = ctrl.userName;
        body.userPasswd = ctrl.userPwd;


        req.body = body;
        var key = DESUtil.getPwdKey(req.body.mobNo);
        var message = req.body.userPasswd;
        var ciphertext = DESUtil.encryptByDES(message, key);

        req.body.userPasswd = ciphertext;
        req.header = this.netRequest.buildRequestHeader();

        ctrl.$loading.show({
            template: Constants.MSG_LOADING,
        });
        this.netRequest.doLogin(req, {
            onSuccess(json: any) {
                ctrl.$loading.hide();
                var resp: LoginResp = json;
                if (resp) {
                    var header: RespHeader = resp.header;
                    if (NetRequestCode.SUCCESS === header.respCode) {
                        var respBody: LoginRespBody = resp.body;
                        console.log("------------登录?" + angular.toJson(respBody));


                        if (Constants.IS_NATIVE) {
                            //save login info
                            var params = new JsonParam103();
                            params.mobno = body.mobNo;
                            params.body = respBody;
                            JsonNativeSender.callNative(JsonCmdId.ID_103_login_saveinfo, params)
                        }

                        if (CommonUtil.isWeixinBrowser()) {
                            var wxopenid = CommonUtil.parseWXOpenId(respBody.wechatOpenid);
                            if (wxopenid) {
                                var ic = IntentCookies.readCookies();
                                ic.wxid = wxopenid;
                                ic.mobno = ctrl.userName;
                                IntentCookies.writeCookies(ic);
                            }
                        }

                        ctrl.$ionicHistory.goBack(-1);
                        //     ctrl.$state.go("productlist");

                    }
                }

            },
            onFailure(e: any) {
                ctrl.$loading.hide();
                console.log("------------登录失败" + e);

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

    //前往注册
    forwardRegister() {
        if (Constants.IS_NATIVE) {
            this.withNativeForwardRegister();
        } else {
            this.withJsForwardRegister();
        }
    }

    private withJsForwardRegister() {
        var intentRegist = new IntentRegist();
        intentRegist.intentLogin = this.intentLogin;
        this.$state.go("regist", IntentParamModel(intentRegist));
    }

    private withNativeForwardRegister() {
        JsonNativeSender.callNative(JsonCmdId.ID_200_register,null);
    }
        //前往找回密码
    forwardPwdReset() {
        this.$state.go("pwdreset");
    }
}
LoginController.$inject = [EasycashServicesName.NetRequestService,
    EasycashServicesName.AppStatusService,
    "$ionicHistory",
    '$state',
    '$stateParams',
    "$ionicLoading",
    "$ionicNavBarDelegate"];
export {LoginController};
