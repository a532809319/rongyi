import {NetRequest, NetRequestCode} from "./../../services/easycash.network";
import {EasycashServicesName} from "./../../services/services.module";
import {IntentParamModel, DATA} from "./../../models/intent.parammodel";
import {IntentProductDetail} from "./../../models/intent.product.detail";
import {ProductInfoIReq} from "./../../dto/request/ProductsReq";
import {ProdDtlResp} from "./../../dto/response/ProductsResp";
import {ProdDtlRespBody} from "./../../dto/response/body/ProdDtlRespBody";
import {ProdBasicInfo} from "./../../dto/entity/ProdBasicInfo";
import {ProductInterest} from "./../../models/product.interest";
import {AppStatusService} from "../../services/app.status.service";
import {IntentLogin, LEPApplyProduct} from "../../models/intent.login";
import {Constants} from "../../models/constants";
import {OrderReq} from "../../dto/request/OrderReq";
import {OrderReqBody} from "../../dto/request/body/OrderReqBody";
import {DateUtil, DTFMT_YMD_ZERO, DTFMT_HMS_ZERO} from "../../models/date.util";
import {IntentCookies, key_intent_product_detail} from "../../models/intent.cookies";
import {LoginStatus} from "../../models/LoginStatus";
import {ItemPlatform} from "../../models/item.platform";
import {JsonNativeSender} from "../../nativepage/impl/json.native.sender";
import {JsonCmdId} from "../../nativepage/impl/json.cmdid";
import {JsonParam501} from "../../nativepage/impl/json.param.501";
import {JsonParam502} from "../../nativepage/impl/json.param.502";

class ProductDetailController {
    public itemPlatform: ItemPlatform = new ItemPlatform();
    body: ProdDtlRespBody;

    productInterest: ProductInterest = new ProductInterest();
    mProductId: string = null;
    private ionicModalInstance: ionic.modal.IonicModalController;

    constructor(private netRequest: NetRequest,
                private appStatusService: AppStatusService,
                private $state: angular.ui.IStateService,
                private $stateParams: angular.ui.IStateParamsService,
                private $loading: ionic.loading.IonicLoadingService,
                private $ionicModal: ionic.modal.IonicModalService,
                private $scope: angular.IScope) {

        this.loadData();

    }

    private loadData() {
        if (Constants.IS_NATIVE) {

            this.withNativeLoadData();
        } else {

            // var intent: IntentProductDetail = this.$stateParams[DATA];
            var intent = IntentCookies.readIntent(key_intent_product_detail);

            if (intent == null) {
                console.log("--------------产品找不到 intent,前往主页(所有状态丢失)");
                alert("产品找不到,前往产品列表");
                this.$state.go("productlist");
                return;
            }
            var productId: string = intent.productId;
            this.withJsLoadData(productId);
        }
    }

    //被Native调用
    public initNative(productId: string) {
        this.mProductId = productId;
        this.withNativeLoadData();
    }

    private   withNativeLoadData() {
        if (this.mProductId == null) {
            return;
        }
        this.withJsLoadData(this.mProductId);
    }

    private withJsLoadData(productId: string) {
        this.mProductId = productId;
        console.log("--------------产品ID " + productId);
        var req: ProductInfoIReq = new ProductInfoIReq();
        req.header = this.netRequest.buildRequestHeader();
        var vm = this;
        vm.$loading.show({
            template: Constants.MSG_LOADING,
        });
        this.netRequest.queryProductDetails(req, productId, {
            onSuccess(json: any) {
                vm.$loading.hide();
                console.log("----------------产品详情" + angular.toJson(json));
                if (json) {
                    var resp: ProdDtlResp = json;
                    var header = resp.header;
                    if (NetRequestCode.SUCCESS === header.respCode) {
                        vm.body = resp.body;
                        vm.secMinDay(resp.body.basicInfo);
                        vm.productInterest.setProductBasicInfo(resp.body.basicInfo);
                        console.log("----------------产品详情body---" + angular.toJson(vm.body));

                    }

                }
            },
            onFailure(e: any) {
                vm.$loading.hide();
            }
        });
    }

    //根据periodUnit的值转化为时间单位，0->分钟，1->小时，2->日；
    secMinDay(prodBasInfo: ProdBasicInfo) {
        switch (prodBasInfo.putMoneyTimeUnit) {
            case "0":
                prodBasInfo.putMoneyTimeUnit = "分钟";
                break;
            case "1":
                prodBasInfo.putMoneyTimeUnit = "小时";
                break;
            default:
                prodBasInfo.putMoneyTimeUnit = "日";
                break;
        }

        prodBasInfo.periodUnit = ( prodBasInfo.periodUnit === "0" ) ? "日" : "月";

        return prodBasInfo;
    }


    private doApplyProduct() {
        //1.获取输入信息
        //2.验证输入信息
        //3.判定是否登录
        //4.申请资料补全
        //5.提交申请
        if (Constants.IS_NATIVE) {
            this.withNativeApplyProduct();
        } else {
            this.withJsApplyProduct();
        }

    }

    private withJsApplyProduct() {
        if (this.body == null) {
            return;
        }

        var ok: boolean = true;

        if (ok) {

            var redirect = this.body.basicInfo.productUrl;
            if (redirect != null) {
                window.location.href = redirect;
                //    window.open(redirect,"__blank"); //can not work

                //   cordova.InAppBrowser.open(redirect,"__blank");
                //   var intent: IntentThirdWebpage = new IntentThirdWebpage();
                //    intent.url = redirect+"&output=embed";
                //    this.$state.go("thirdwebpage", IntentParamModel(intent));

            }
            return;
        }

        if (!LoginStatus.isLogin()) {

            var intentLogin = new IntentLogin();
            intentLogin.loginEntryPoint = LEPApplyProduct;
            this.$state.go("login", IntentParamModel(intentLogin));

            return;
        } else {
            var redirect = this.body.basicInfo.productUrl;
            if (redirect != null) {
                //  window.location.href=redirect ;
                window.open(redirect, "__blank");

                //   cordova.InAppBrowser.open(redirect,"__blank");
                //   var intent: IntentThirdWebpage = new IntentThirdWebpage();
                //    intent.url = redirect+"&output=embed";
                //    this.$state.go("thirdwebpage", IntentParamModel(intent));

            }

        }
        var ic = IntentCookies.readCookies();
        var userId = ic.uid;
        var productId = this.mProductId;
        var basicInfo: ProdBasicInfo = this.body.basicInfo;

        var req = new OrderReq();
        req.header = this.netRequest.buildRequestHeader();
        var body = new OrderReqBody();

        body.userId = userId;
        body.name = ic.mobno;
        body.productId = this.mProductId;
        body.productName = basicInfo.prodName;

        body.loanLimitApply = this.productInterest.inputAmount;
        body.loanPeriod = this.productInterest.inputPeriod;
        body.monthRate = basicInfo.monthRate;
        body.loanAmountPaidIn = "0";

        body.transDate = DateUtil.dateFormat(DTFMT_YMD_ZERO, "");
        body.transTime = DateUtil.dateFormat(DTFMT_HMS_ZERO, "");

        req.body = body;

        var vm = this;
        vm.$loading.show({
            template: Constants.MSG_LOADING,
        });
        this.netRequest.doOrderCreate(req, userId, productId, {
            onFailure(e){
                vm.$loading.hide();
            },
            onSuccess(json){
                vm.$loading.hide();

            }
        });


        //补全资料
        //不同产品接口不一样
        //    var intentMarks = new IntentMarks();
        //    intentMarks.type = "1";
        //   this.$state.go("completeinfor", IntentParamModel(intentMarks));

    }

    private withNativeApplyProduct() {
        if (this.body == null) {
            return;
        }
        var params = new JsonParam501();
        params.amount = this.productInterest.inputAmount;
        params.period = this.productInterest.inputPeriod;
        params.unit = this.productInterest.basicInfo.prodCatg;
        params.body = this.body;
        JsonNativeSender.callNative(JsonCmdId.ID_501_product_apply, params);
    }


    closeModal() {
        console.log("closeModal , " + (this.ionicModalInstance == null));
        if (this.ionicModalInstance != null) {
            this.ionicModalInstance.remove();
        }
    }


    private showThirdWebpage() {
        var ctrl = this;
        var options = {
            scope: this.$scope,
            backdropClickToClose: true,
            hardwareBackButtonClose: true
        }

        var templateUrl = "./moduleproduct/third.webpage.html";
        var promiseCtrl = this.$ionicModal.fromTemplateUrl(templateUrl, options);
        promiseCtrl.then(function (modal) {
            ctrl.ionicModalInstance = modal;
            ctrl.ionicModalInstance.show();

            ctrl.$scope.$on("modal.hidden", function () {
                console.log("modal.hidden");
                ctrl.closeModal();
            })
            ctrl.$scope.$on("modal.removed", function () {
                console.log("modal.removed")

            })
            ctrl.$scope.$on("$destroy", function () {
                console.log("modal.$destroy")
                ctrl.closeModal();
            })
        });

    }

    forwardLoanStrategy() {
        if (Constants.IS_NATIVE) {
            this.withNativeForwardLoanStrategy();
        } else {
            this.withJsForwardLoanStrategy();
        }
    }

    withJsForwardLoanStrategy() {
        if (this.body!=null && this.body.opsInfo!=null) {
            var redirect = this.body.opsInfo.strategyGuideUrl;
            if (redirect != null) {
                window.location.href = redirect;
            }
        }
    }

    withNativeForwardLoanStrategy() {
        if (this.body!=null && this.body.opsInfo!=null) {
            var redirect = this.body.opsInfo.strategyGuideUrl;
            if(redirect!=null){
                var jsonParam502=new JsonParam502();
                jsonParam502.strategyGuideUrl=redirect;
                JsonNativeSender.callNative(JsonCmdId.ID_502_product_strategy_guide,jsonParam502);
            }
        }
    }


}


ProductDetailController.$inject = [
    EasycashServicesName.NetRequestService,
    EasycashServicesName.AppStatusService,
    "$state", "$stateParams", "$ionicLoading",
    "$ionicModal", "$scope"];
export {ProductDetailController};
