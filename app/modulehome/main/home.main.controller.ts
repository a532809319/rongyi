/**
 * Created by 79078_000 on 2016/10/17.
 */


import {NetRequest, NetRequestCode} from "./../../services/easycash.network";
import {EasycashServicesName} from "./../../services/services.module";
import {IntentParamModel} from "./../../models/intent.parammodel";
import {RecommendedProdsReq} from "./../../dto/request/ProductsReq";
import {RespHeader} from "./../../dto/base/Base";
import {RecommendedProdsResp} from "./../../dto/response/ProductsResp";
import {RecommendedProdsRespBody} from "./../../dto/response/body/RecommendedProdsRespBody";
import {ProdBriefInfo} from "./../../dto/entity/ProdBriefInfo";
import {IntentProductDetail} from "./../../models/intent.product.detail";
import {IntentHomeSearch} from "../../models/intent.home.search";
import {BasicSearchCriteria} from "../../dto/entity/BasicSearchCriteria";
import {LoadDuration} from "../../dto/entity/LoadDuration";
import {Constants} from "../../models/constants";
import {AppStatusService} from "../../services/app.status.service";
import {IntentCookies, key_intent_product_detail} from "../../models/intent.cookies";
import {RouterNativeName} from "../../nativepage/router.native.name";
import {JsonNativeSender} from "../../nativepage/impl/json.native.sender";
import {JsonCmdId} from "../../nativepage/impl/json.cmdid";
import {JsonParam300} from "../../nativepage/impl/json.param.300";
import {ItemPlatform} from "../../models/item.platform";


class HomeMainController implements angular.IComponentController {
    public itemPlatform: ItemPlatform = new ItemPlatform();


    public items: Array<ProdBriefInfo> = [];

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
        console.log("netInstance is null?" + (this.netRequest == null));
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
                            }
                            //todo update ui
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


}
HomeMainController.$inject = [
    EasycashServicesName.NetRequestService,
    "$state",
    "$scope"
];


export {HomeMainController};
