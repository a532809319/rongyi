import {NetRequest, NetRequestCode} from "../services/easycash.network";
import {EasycashServicesName} from "../services/services.module";
import {Constants} from "../models/constants";
import {ZmadengReq} from "../dto/request/ZmadengReq";
import {ZmadengResp} from "../dto/response/ZmadengResp";
import {ZmadengReqBody} from "../dto/request/body/ZmadengReqBody";
import {RespHeader} from "../dto/base/Base";
import {ZmadengRespBody} from "../dto/response/body/ZmadengRespBody";
import {BannerInfo} from "../dto/entity/BannerInfo";
import {AppStartUpInfoReq} from "../dto/request/AppStartUpInfoReq";
import {AppStartUpInfoResp} from "../dto/response/AppStartUpInfoResp";
import {AppStartUpInfoReqBody} from "../dto/request/body/AppStartUpInfoReqBody";
import {AppStartUpInfoRespBody} from "../dto/response/body/AppStartUpInfoRespBody";
import {SelectedProdsReq} from "./../dto/request/ProductsReq";
import {SelectedProdsRespBody} from "./../dto/response/body/SelectedProdsRespBody";
import {ProdBriefInfo} from "./../dto/entity/ProdBriefInfo";

import {SelectedProdsResp} from "./../dto/response/ProductsResp";
import {ProductBriefInfoUtil} from "../models/product.briefinfo.util";





class FirstController {
    public productitems: Array<ProdBriefInfo> = [];

    public adsImages: Array<BannerInfo> = null;
    public items: any;


    constructor(private netRequest: NetRequest,
                private $ionicSlideBoxDelegate: ionic.slideBox.IonicSlideBoxDelegate) {
        this.doGetUpgradeInfoAndAdsImages();
        this.doGetZmadeng();
        this.loadHomeProducts();

    }

    zoumadeng(a: number) {
        var oDataBox = document.getElementById('data-box');
        var num: number = a;
        var onDataLength = angular.element(document.querySelector('.zmd-box-data'))[0].offsetWidth;

        oDataBox.style.width = num * onDataLength + 'px';

        oDataBox.style.left = num * onDataLength + 'px';
        var i = 500;
        setInterval(function () {
            i = i - 2;
            oDataBox.style.left = i + 'px';
            // console.log(i)
            if (i < -num * onDataLength) {
                i = 500;
            }
        }, 60)

    }

    doGetUpgradeInfoAndAdsImages() {
        var ctr = this;

        var req = new AppStartUpInfoReq();
        req.header = this.netRequest.buildRequestHeader();
        req.body = new AppStartUpInfoReqBody();
        req.body.appName = "容易借";
        req.body.channel = "MAIN_DEFAULT";
        req.body.platform = "01";

        this.netRequest.doGetUpgradeInfoAndAdsImages(req, {
            onFailure(e: any){
                alert("e " + angular.toJson(e));
            },
            onSuccess(json: any){
                var resp: AppStartUpInfoResp = json;

                if (resp != null) {
                    var header: RespHeader = resp.header;
                    if (NetRequestCode.SUCCESS === header.respCode) {
                        var body: AppStartUpInfoRespBody = resp.body;
                        if (body != null && body.bannerInfos != null) {
                            ctr.adsImages = body.bannerInfos;

                        }
                    }
                }
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
                                helloCtrl.productitems = body.selectedProds;
                                ProductBriefInfoUtil.secMinDay(helloCtrl.productitems);
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
                            if (body != null && body != null) {
                                ctrl.items = body;
                                ctrl.zoumadeng(ctrl.items.msgList.length);
                            }
                            //todo update ui
                        }
                    }
                } catch (e) {
                    console.log("---------parse error:" + e.message);
                }
            }
        });

    }

    Tab1() {
        if (Constants.IS_NATIVE) {
            alert('is nativer')
        } else {
            alert('it is  un native')
        }
    }

    Tab2() {
        if (Constants.IS_NATIVE) {
            alert('is nativer')
        } else {
            alert('it is  un native')
        }
    }

    Tab3() {
        if (Constants.IS_NATIVE) {
            alert('is nativer')
        } else {
            alert('it is  un native')
        }
    }

    Tab4() {
        if (Constants.IS_NATIVE) {
            alert('is nativer')
        } else {
            alert('it is  un native')
        }
    }

    Tab5() {
        if (Constants.IS_NATIVE) {
            alert('is nativer')
        } else {
            alert('it is  un native')
        }
    }

    Tab6() {
        if (Constants.IS_NATIVE) {
            alert('is nativer')
        } else {
            alert('it is  un native')
        }
    }

    Tab7() {
        if (Constants.IS_NATIVE) {
            alert('is nativer')
        } else {
            alert('it is  un native')
        }
    }

    Tab8() {
        if (Constants.IS_NATIVE) {
            alert('is nativer')
        } else {
            alert('it is  un native')
        }
    }

}

FirstController.$inject = [
    EasycashServicesName.NetRequestService,
    "$ionicSlideBoxDelegate"
];
export {FirstController}
