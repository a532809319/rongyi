import {NetRequest, NetRequestCode} from "./../../services/easycash.network";
import {EasycashServicesName} from "./../../services/services.module";
import {IntentParamModel} from "./../../models/intent.parammodel";
import {SelectedProdsReq} from "./../../dto/request/ProductsReq";
import {RespHeader} from "./../../dto/base/Base";
import {SelectedProdsResp} from "./../../dto/response/ProductsResp";
import {SelectedProdsRespBody} from "./../../dto/response/body/SelectedProdsRespBody";
import {ProdBriefInfo} from "./../../dto/entity/ProdBriefInfo";
import {IntentProductDetail} from "./../../models/intent.product.detail";
import {IntentHomeSearch} from "../../models/intent.home.search";
import {BasicSearchCriteria} from "../../dto/entity/BasicSearchCriteria";
import {LoadDuration} from "../../dto/entity/LoadDuration";
import {Constants} from "../../models/constants";
import {AppStatusService} from "../../services/app.status.service";
import {IntentCookies, key_intent_product_detail, key_intent_product_loweramount} from "../../models/intent.cookies";
import {RouterNativeName} from "../../nativepage/router.native.name";
import {JsonNativeSender} from "../../nativepage/impl/json.native.sender";
import {JsonCmdId} from "../../nativepage/impl/json.cmdid";
import {JsonParam300} from "../../nativepage/impl/json.param.300";
import {ItemPlatform} from "../../models/item.platform";
import {IntentProductLowerAmount} from "../../models/intent.product.loweramount";
import {ProdTypeJisuCash} from "../../dto/entity/ProdTypes";
import {HomeSelectType} from "../../models/home.select.type";
import {RYStorage} from "../../services/RYStorage";
import {RYStorageKeys} from "../../models/RYStorage.keys";
import {ProductBriefInfoUtil} from "../../models/product.briefinfo.util";


class ProductListController implements angular.IComponentController {
    public itemPlatform: ItemPlatform = new ItemPlatform();
    loanAmount: string;

    loanDuration: LoadDuration = new LoadDuration();

    public items: Array<ProdBriefInfo> = [];

    constructor(private netRequest: NetRequest,
                private $state: angular.ui.IStateService,
                private $stateParams: angular.ui.IStateParamsService,
                private $loading: ionic.loading.IonicLoadingService,
                private appStatusService: AppStatusService,
                private $scope: angular.IScope) {
        this.loanAmount = "3000";
        this.loanDuration.loanPeriod = "7";
        this.loanDuration.periodUnit = "1";

        this.loadData();

    }

    getPageTitle() {
        return "小微极速贷";
    }

    private loadData() {


        var helloCtrl = this;
        console.log("netInstance is null?" + (this.netRequest == null));
        var req: SelectedProdsReq = new SelectedProdsReq();
        req.header = this.netRequest.buildRequestHeader();

        var vm = this;
        vm.$loading.show({
            template: Constants.MSG_LOADING,
        });
        this.netRequest.queryCashProduct(req, {
            onFailure(e: any) {
                console.log("---------error:" + e.message);
                vm.$loading.hide();
            },
            onSuccess(json: any) {
                console.log("---------success:" + angular.toJson(json));
                vm.$loading.hide();
                try {
                    var resp: SelectedProdsResp = json;
                    if (resp != null) {
                        var header: RespHeader = resp.header;
                        if (NetRequestCode.SUCCESS === header.respCode) {
                            var body: SelectedProdsRespBody = resp.body;
                            if (body!=null && body.selectedProds!=null) {
                               helloCtrl.items = body.selectedProds;
                                ProductBriefInfoUtil.secMinDay(helloCtrl.items);
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
    }


    forwardProductDetail(prod: ProdBriefInfo) {
        if(this.testSearch()){
            return ;
        }
        if (Constants.IS_NATIVE) {
            this.withNativeForwardProductDetail(prod);
        } else {
            this.withJsForwardProductDetail(prod);
        }
    }

    forwardProductSearch() {
        var intent = new IntentHomeSearch();
        var criteria = new BasicSearchCriteria();
        criteria.loanDuration = this.loanDuration;
        criteria.loanAmount = this.loanAmount;
        intent.basicSearchCriteria = criteria;
        this.$state.go("homesearch", IntentParamModel(intent));
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

    private testSearch():boolean{
        var ok=false;
        if(ok){
            var intent = new IntentProductLowerAmount();
            intent.selectType=HomeSelectType.TAB1_XE1;
            IntentCookies.writeIntent(key_intent_product_loweramount, intent);

            this.$state.go("homeRecommand");
            return  ok;
        }
        return false;
    }
}
ProductListController.$inject = [EasycashServicesName.NetRequestService,
    "$state",
    "$stateParams",
    "$ionicLoading",
    EasycashServicesName.AppStatusService,
    "$scope"
];


export {ProductListController};
