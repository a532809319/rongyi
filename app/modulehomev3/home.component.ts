import {EasycashServicesName} from "../services/services.module";
import {NetRequest, NetRequestCode} from "../services/easycash.network";
import {Constants} from "../models/constants";
import {AppStartUpInfoReq} from "./../dto/request/AppStartUpInfoReq";
import {AppStartUpInfoReqBody} from "./../dto/request/body/AppStartUpInfoReqBody";
import {SelectedProdsResp} from "./../dto/response/ProductsResp";
import {RespHeader} from "./../dto/base/Base";
import {SelectedProdsRespBody} from "./../dto/response/body/SelectedProdsRespBody";
import {ProductBriefInfoUtil} from "../models/product.briefinfo.util";
import {ProdBriefInfo} from "./../dto/entity/ProdBriefInfo";
import {SelectedProdsReq} from "./../dto/request/ProductsReq";
import {AppStartUpInfoResp} from "./../dto/response/AppStartUpInfoResp";
import {AppStartUpInfoRespBody} from "./../dto/response/body/AppStartUpInfoRespBody";
import {BannerInfo} from "./../dto/entity/BannerInfo";
import {JsonParam300} from "../nativepage/impl/json.param.300";
import {JsonNativeSender} from "../nativepage/impl/json.native.sender";
import {JsonCmdId} from "../nativepage/impl/json.cmdid";
import {HomeFeature} from "./home.feature";
import {JsonParam700} from "../nativepage/impl/json.param.700";
import {HomeSelectType} from "../models/home.select.type";
import {ZmadengReq} from "./../dto/request/ZmadengReq";
import {ZmadengReqBody} from "./../dto/request/body/ZmadengReqBody";
import {ZmadengResp} from "./../dto/response/ZmadengResp";
import {ZmadengRespBody} from "./../dto/response/body/ZmadengRespBody";
import {JsonParam97} from "../nativepage/impl/json.param.97";
import {JsonParam96} from "../nativepage/impl/json.param.96";


export class HomeComponent implements angular.IComponentOptions,angular.IComponentController {
    public items: Array<ProdBriefInfo> = [];
    public banners: Array<BannerInfo> = null;
    public marqueeItems: Array<any> = null;

    constructor(private netRequest: NetRequest) {
        this.doGetZmadeng();
        this.doGetUpgradeInfoAndAdsImages();
        this.loadHomeProducts();
    }

    templateUrl = function () {
        return "./home.component.html";
    }
    controller = HomeComponent;
    controllerAs = "vm";
    lunImgClick(bannerInfo:BannerInfo){

       this.forwardLunBoFeature(bannerInfo.bannerPicHref);
    }
    zoumadeng(a: number) {
        var oDataBox = document.getElementById('data-box');
        var num: number = a;
        var onDataLength = angular.element(document.querySelector('.zmd-box-data'))[0].offsetWidth;

        oDataBox.style.width = num * onDataLength + 'px';
        oDataBox.style.left = num * onDataLength + 'px';
        var i = 50;
        setInterval(function () {
            i = i - 2;
            oDataBox.style.left = i + 'px';
            if (i < -num * onDataLength) {
                i = 50;
            }
        }, 60);

    }
    moreprod() {
        this.forwardProductMoreFeature();
    }


    Tab1() {
        this.forwardProductFeature(1);
    }


    Tab2() {
        this.forwardProductFeature(2);
    }

    Tab3() {
        this.forwardProductFeature(3);
    }

    Tab4() {
        this.forwardProductFeature(4);
    }

    Tab5() {
        this.forwardProductFeature(5);
    }

    Tab6() {
        this.forwardProductFeature(6);
    }

    Tab7() {
        this.forwardProductFeature(7);
    }

    Tab8() {
        this.forwardProductFeature(8);
    }

    clickTab1XE1() {
        this.forwardProductList(HomeSelectType.TAB1_XE1);
    }


    clickTab1XE2() {
        this.forwardProductList(HomeSelectType.TAB1_XE2);
    }

    clickTab1XE3() {
        this.forwardProductList(HomeSelectType.TAB1_XE3);
    }

    doGetUpgradeInfoAndAdsImages() {
        if (this.netRequest == null) {
            return;
        }
        console.log(this.netRequest);
        var req = new AppStartUpInfoReq();
        req.header = this.netRequest.buildRequestHeader();
        req.body = new AppStartUpInfoReqBody();
        req.body.appName = "容易借";
        req.body.channel = "MAIN_DEFAULT";
        req.body.platform = "00";
        var ctrl = this;

        this.netRequest.doGetUpgradeInfoAndAdsImages(req, {
            onFailure(e: any){

            },
            onSuccess(json: any){
                var resp: AppStartUpInfoResp = json;
                var respBody: AppStartUpInfoRespBody = resp == null ? null : resp.body;
                var banners: Array<BannerInfo> = respBody == null ? null : respBody.bannerInfos;
                ctrl.banners = banners;

            }
        });

    }


    private loadHomeProducts() {
        if (this.netRequest == null) {
            return;
        }
        var helloCtrl = this;
        var req: SelectedProdsReq = new SelectedProdsReq();
        req.header = this.netRequest.buildRequestHeader();

        this.netRequest.queryCashProduct(req, {
            onFailure(e: any) {
                console.log("---------error:" + e.message);

            },
            onSuccess(json: any) {
                console.log("---------success:" + angular.toJson(json));

                try {
                    var resp: SelectedProdsResp = json;
                    if (resp != null) {
                        var header: RespHeader = resp.header;
                        if (NetRequestCode.SUCCESS === header.respCode) {
                            var body: SelectedProdsRespBody = resp.body;
                            if (body != null && body.selectedProds != null) {
                                body.selectedProds.pop();
                                helloCtrl.items = body.selectedProds;
                                ProductBriefInfoUtil.secMinDay(helloCtrl.items);
                            }
                        }
                    }
                } catch (e) {
                    console.log("---------parse error:" + e.message);
                }
                console.log("---------" + helloCtrl.items.length);

            }
        });

        //获取wxopenid
        this.netRequest.doGetWXOpenId(null);
    }


    doGetZmadeng() {
        if (this.netRequest == null) {
            return;
        }
        var ctrl = this;
        var req: ZmadengReq = new ZmadengReq();
        req.header = this.netRequest.buildRequestHeader();
        var body: ZmadengReqBody = new ZmadengReqBody();
        req.body = body;

        this.netRequest.doGetZmadeng(req, {
            onFailure(e: any){
            },
            onSuccess(json: any){
                try {
                    var resp: ZmadengResp = json;
                    if (resp != null) {
                        var header: RespHeader = resp.header;
                        if (NetRequestCode.SUCCESS === header.respCode) {
                            var body: ZmadengRespBody = resp.body;
                            if (body != null && body != null
                                && body.msgList != null && body.msgList.length > 0) {
                                ctrl.marqueeItems = body.msgList;
                                ctrl.zoumadeng(ctrl.marqueeItems.length);
                            }
                        }
                    }
                } catch (e) {
                    console.log("---------parse error:" + e.message);
                }
            }
        });

    }
    forwardProductMoreFeature(){
        var list ="list";
        if (Constants.IS_NATIVE) {
            this.withNativeForwardProductMorFeature(list);
        } else {
            this.withJsForwardProductMorFeature(list);
        }
    }
    forwardLunBoFeature(link:string){
        var list =link;
        if (Constants.IS_NATIVE) {
            this.withNativeForwardLinkFeature(link);
        } else {
            this.withJsForwardLinkFeature(link);
        }
    }
    forwardProductFeature(index: number) {
        var tag = HomeFeature.getFeature(index);
        if (Constants.IS_NATIVE) {
            this.withNativeForwardProductFeature(tag);
        } else {
            this.withJsForwardProductFeature(tag);
        }
    }

    withJsForwardProductFeature(tag: string) {

    }
    withJsForwardProductMorFeature(list:string){

    }
    withJsForwardLinkFeature(link:string){

    }

    withNativeForwardProductFeature(tag: string) {
        var jsonParam = new JsonParam700();
        jsonParam.tag = tag;
        JsonNativeSender.callNative(JsonCmdId.ID_700_tag, jsonParam);
    }
    withNativeForwardLinkFeature(link:string){
        var jsonParam = new JsonParam96();
        jsonParam.link = link;
        JsonNativeSender.callNative(JsonCmdId.ID_96_prod_link, jsonParam);

    }
    withNativeForwardProductMorFeature(list:string){
        var jsonParam = new JsonParam97();
        jsonParam.list = list;
        JsonNativeSender.callNative(JsonCmdId.ID_97_prod_list, jsonParam);
    }



    forwardProductDetail(prod: ProdBriefInfo) {
        if (Constants.IS_NATIVE) {
            this.withNativeForwardProductDetail(prod);
        } else {
            this.withJsForwardProductDetail(prod);
        }
    }

    withNativeForwardProductDetail(prod: ProdBriefInfo) {

        var jp = new JsonParam300();
        jp.productId = prod.productId;
        JsonNativeSender.callNative(JsonCmdId.ID_300_product_item_select, jp);

    }

    withJsForwardProductDetail(prod: ProdBriefInfo) {
        // if (prod == null || prod.productId == null) {
        //     return;
        // }
        // var intent: IntentProductDetail = new IntentProductDetail();
        // intent.productId = prod.productId;
        //
        // IntentCookies.writeIntent(key_intent_product_detail, intent);
        //
        // this.$state.go("productdetail", IntentParamModel(intent));
    }

    forwardProductList(tag: string) {
        if (Constants.IS_NATIVE) {
            this.withNativeForwardProductList(tag);
        } else {
            this.withJsForwardProductList(tag);
        }
    }

    withJsForwardProductList(tag: string) {

    }

    withNativeForwardProductList(tag: string) {
        var jsonParam = new JsonParam700();
        jsonParam.tag = tag;
        JsonNativeSender.callNative(JsonCmdId.ID_700_tag, jsonParam);
    }
}
HomeComponent.$inject = [EasycashServicesName.NetRequestService];
