import {NetRequest, NetRequestCode} from "../../services/easycash.network";
import {EasycashServicesName} from "../../services/services.module";
import {IntentCookies, key_intent_product_tag, key_intent_product_detail} from "../../models/intent.cookies";
import {BasicSearchReq} from "../../dto/request/BasicSearchReq";
import {BasicSearchReqBody} from "../../dto/request/body/BasicSearchReqBody";
import {HomeSelectType} from "../../models/home.select.type";
import {ProdTypeJisuCash} from "../../dto/entity/ProdTypes";
import {SearchedProdsResp} from "../../dto/response/SearchedProdsResp";
import {SearchedProdsRespBody} from "../../dto/response/body/SearchedProdsRespBody";
import {ProdBriefInfo} from "../../dto/entity/ProdBriefInfo";
import {IntentProductTag} from "../../models/intent.product.tag";
import {IntentProductDetail} from "../../models/intent.product.detail";
import {Constants} from "../../models/constants";
import {IntentParamModel} from "../../models/intent.parammodel";
import {JsonParam300} from "../../nativepage/impl/json.param.300";
import {JsonNativeSender} from "../../nativepage/impl/json.native.sender";
import {JsonCmdId} from "../../nativepage/impl/json.cmdid";
import {SearchEnum} from "../../models/searchEnum";
import {ProductBriefInfoUtil} from "../../models/product.briefinfo.util";

/**
 * Created by 79078_000 on 2016/10/26.
 */

class ProductLowerAmountController {
    items: Array<ProdBriefInfo> = [];
    productTag:string;

    constructor(private netRequest: NetRequest,
                private $state: angular.ui.IStateService,
                private $stateParams: angular.ui.IStateParamsService,
                private $loading: ionic.loading.IonicLoadingService) {

        this.loadData();

    }

    loadData() {
        if(Constants.IS_NATIVE){
            this.withNativeLoadData();
        }else{
           this.withJsLoadData();
        }

    }

    withJsLoadData(){
        var product: IntentProductTag = IntentCookies.readIntent(key_intent_product_tag);
        if (product != null) {
            this.productTag = product.tag;
            this.doRequestTagsType();
        }
    }

    withNativeLoadData(){
        if(this.productTag==null){
            return ;
        }
        this.doRequestTagsType();
    }

    private doRequestTagsType(){
        var req = new BasicSearchReq();
        req.header = this.netRequest.buildRequestHeader();
        var ctrl=this;
        this.netRequest.doSearchType(req, {
            onFailure(e: any){

            },
            onSuccess(json: any){

                console.log("---按照产品类型搜索---" + angular.toJson(json));
                var resp: SearchedProdsResp = json;

                if (resp) {
                    var header = resp.header;
                    if (NetRequestCode.SUCCESS === header.respCode) {
                        var respBody: SearchedProdsRespBody = resp.body;
                        if (respBody) {
                            if(respBody.productTypes==null){
                                return ;
                            }

                            var prodTypeValue:string = "03";//小微极速贷
                            var prodTypeId:string = null;
                            for(var i=0;i<respBody.productTypes.length;i++){
                                var item=respBody.productTypes[i];
                                if(prodTypeValue===item.prodTypeValue){
                                    if(item.prodTypeId!=null){
                                        prodTypeId=item.prodTypeId;
                                    }
                                    break;
                                }
                            }

                            if (prodTypeId == null) {
                                return;
                            }
                            ctrl.doRequestProductList(ctrl.productTag,prodTypeId);
                        }
                    }
                }
            }
        })
    }

    private doRequestProductList(type: string,prodTypeId:string) {
        if(type==null){
            return ;
        }
        if(prodTypeId==null){
            return ;
        }
        var req = new BasicSearchReq();
        var body = new BasicSearchReqBody();
        var minLoan: string = null;
        var maxLoan: string = null;
        if (HomeSelectType.TAB1_XE1 === type) {
            minLoan = "500";
            maxLoan = "1000";
        } else if (HomeSelectType.TAB1_XE2 === type) {
            minLoan = "1000";
            maxLoan = "5000";
        } else {
            minLoan = "5000";
            maxLoan = "5000";
        }
        body.minLoanAmount = minLoan
        body.maxLoanAmount = maxLoan;
        body.prodTypeId =prodTypeId;

        req.header = this.netRequest.buildRequestHeader();
        req.body = body;
        var ctrl=this;
        this.netRequest.doSearch(req, {
            onSuccess(json: any){

                console.log("-------------小额借款产品" + angular.toJson(json));
                var resp: SearchedProdsResp = json;
                if (resp) {
                    var header = resp.header;
                    if (NetRequestCode.SUCCESS === header.respCode) {
                        var respBody: SearchedProdsRespBody = resp.body;
                        if (respBody) {
                            if (respBody.searchedProds != null) {
                                ctrl.items = respBody.searchedProds;
                                ProductBriefInfoUtil.secMinDay(ctrl.items);
                            } else {
                                ctrl.items = [];
                            }
                        }
                    }
                }
            },
            onFailure(e: any){
                console.log("------------err=" + e);
            }
        })
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

    initNative(tag:string){
        this.productTag=tag;
        this.withNativeLoadData();
    }
}

ProductLowerAmountController.$inject = [
    EasycashServicesName.NetRequestService,
    "$state",
    "$stateParams",
    "$ionicLoading"

];

export {ProductLowerAmountController}
