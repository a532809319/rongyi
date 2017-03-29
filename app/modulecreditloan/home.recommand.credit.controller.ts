/**
 * Created by 79078_000 on 20../30.
 */
/**
 * Created by 79078_000 on 20../17.
 */
import {NetRequest, NetRequestCode} from "../services/easycash.network";
import {EasycashServicesName} from "../services/services.module";
import {IntentParamModel} from "../models/intent.parammodel";
import {RecommendedProdsReq} from "../dto/request/ProductsReq";
import {RespHeader} from "../dto/base/Base";
import {RecommendedProdsResp} from "../dto/response/ProductsResp";
import {RecommendedProdsRespBody} from "../dto/response/body/RecommendedProdsRespBody";
import {ProdBriefInfo} from "../dto/entity/ProdBriefInfo";
import {IntentProductDetail} from "../models/intent.product.detail";
import {Constants} from "../models/constants";
import {IntentCookies, key_intent_product_detail, key_intent_product_tag} from "../models/intent.cookies";
import {JsonNativeSender} from "../nativepage/impl/json.native.sender";
import {JsonCmdId} from "../nativepage/impl/json.cmdid";
import {JsonParam300} from "../nativepage/impl/json.param.300";
import {ItemPlatform} from "../models/item.platform";
import {JsonParam98} from "../nativepage/impl/json.param.98";
import {HomeSelectType} from "../models/home.select.type";
import {ProductTag} from "../models/product.tag";
import {IntentProductTag} from "../models/intent.product.tag";
import {RouterNameService} from "../services/routename.service";
import {ProductBriefInfoUtil} from "../models/product.briefinfo.util";
import {JsonParam700} from "../nativepage/impl/json.param.700";
import {BannerInfo} from "../dto/entity/BannerInfo";
import {AppStartUpInfoReq} from "../dto/request/AppStartUpInfoReq";
import {AppStartUpInfoReqBody} from "../dto/request/body/AppStartUpInfoReqBody";

class HomeRecommandCreditController implements angular.IComponentController {
    public itemPlatform: ItemPlatform = new ItemPlatform();


    public items: Array<ProdBriefInfo> = [];
    public productTags: Array<ProductTag> = [];
    public adsImages:Array<BannerInfo>=[];

    constructor(private netRequest: NetRequest,
                private $state: angular.ui.IStateService,
                private $scope: angular.IScope) {

        this.loadData();
      
    }

    getPageTitle() {
        return "产品推荐";
    }

    private loadData() {

        var helloCtrl = this;
        var req: RecommendedProdsReq = new RecommendedProdsReq();
        req.header = this.netRequest.buildRequestHeader();
        this.netRequest.queryRecommandProduct(req, {
            onFailure(e: any) {
                console.log("---------error:" + e.message);

            },
            onSuccess(json: any) {
                console.log("---------success:" + angular.toJson(json));
                try {
                    var resp: RecommendedProdsResp = json;
                    if (resp != null) {
                        var header: RespHeader = resp.header;
                        if (NetRequestCode.SUCCESS === header.respCode) {
                            var body: RecommendedProdsRespBody = resp.body;
                            if (body != null && body.recommendedProds != null) {
                                helloCtrl.items = body.recommendedProds;
                                ProductBriefInfoUtil.secMinDay(helloCtrl.items);
                            }
                            //todo update ui
                            if (Constants.IS_NATIVE) {
                                setTimeout(function () {
                                    var params = new JsonParam98();
                                    params.documentHeight = document.body.scrollHeight;
                                    JsonNativeSender.callNative(JsonCmdId.ID_98_document_height, params);
                                }, 200);
                            }
                        }
                    }
                } catch (e) {
                    console.log("---------parse error:" + e.message);
                }
                console.log("---------" + helloCtrl.items.length);
                //helloCtrl.$scope.$evalAsync(function () {  });//需要手动刷新
            }
        });

        //获取wxopenid
        this.netRequest.doGetWXOpenId(null);

        this.doGetUpgradeInfoAndAdsImages();
    }


    forwardProductDetail(prod: ProdBriefInfo) {
        if (Constants.IS_NATIVE) {
            this.withNativeForwardProductDetail(prod);
        } else {
            this.withJsForwardProductDetail(prod);
        }
    }


    withJsForwardProductDetail(prod: ProdBriefInfo) {
        if (prod == null || prod.productId == null) {
            return;
        }
        var intent: IntentProductDetail = new IntentProductDetail();
        intent.productId = prod.productId;

        IntentCookies.writeIntent(key_intent_product_detail, intent);

        this.$state.go("productdetail", IntentParamModel(intent));
    }

    withNativeForwardProductDetail(prod: ProdBriefInfo) {

        var jp = new JsonParam300();
        jp.productId = prod.productId;
        JsonNativeSender.callNative(JsonCmdId.ID_300_product_item_select, jp);
    }


    //   $onInit() {
    //      console.log("-------------searchOnInit");
    //   }

    forwardProductList(type: string) {

        if (Constants.IS_NATIVE) {
            this.withNativeForwardProductList(type);
        } else {
            this.withJsForwardProductList(type);
        }
    }

    withJsForwardProductList(type: string) {
        var intent: IntentProductTag = new IntentProductTag();
        intent.tag = type;
        IntentCookies.writeIntent(key_intent_product_tag, intent);
        if (HomeSelectType.TAB1_XE1 === type
            || HomeSelectType.TAB1_XE2 === type
            || HomeSelectType.TAB1_XE3 === type) {
            this.$state.go(RouterNameService.productLowerAmountLoanPage);
        }else if(HomeSelectType.CREDIT_APPLY===type){
            window.location.href = "http://credit.haodai.com/Mobile/creditcard/city/shanghai.html";
        } else {
            this.$state.go(RouterNameService.productTagListPage);
        }
    }

    withNativeForwardProductList(type: string) {
        var jsonParam = new JsonParam700();
        jsonParam.tag = type;
        JsonNativeSender.callNative(JsonCmdId.ID_700_tag, jsonParam);
    }

    clickTab1() {
        this.forwardProductList(HomeSelectType.CASHSELECTED);
    }

    clickTab2() {
        this.forwardProductList(HomeSelectType.CREDITCARDREPAY);
    }

    clickTab3() {
        this.forwardProductList(HomeSelectType.CREDIT_APPLY);

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

    private   doGetUpgradeInfoAndAdsImages(){
        var req=new AppStartUpInfoReq();
        req.header=this.netRequest.buildRequestHeader();
        req.body=new AppStartUpInfoReqBody();
        req.body.appName="容易借";
        req.body.channel="MAIN_DEFAULT";
        req.body.platform="01";

        this.netRequest.doGetUpgradeInfoAndAdsImages(req,{
            onFailure(e:any){
                alert("e "+angular.toJson(e));
            },
            onSuccess(json:any){
                alert("s"+angular.toJson(json));
            }
        });

    }

}
HomeRecommandCreditController.$inject = [
    EasycashServicesName.NetRequestService,
    "$state",
    "$scope"
];


export {HomeRecommandCreditController};
