import {NetRequest, NetRequestCode} from "../../services/easycash.network";
import {ProdBriefInfo} from "../../dto/entity/ProdBriefInfo";
import {EasycashServicesName} from "../../services/services.module";
import {Constants} from "../../models/constants";
import {IntentProductDetail} from "../../models/intent.product.detail";
import {IntentCookies, key_intent_product_detail, key_intent_product_tag} from "../../models/intent.cookies";
import {IntentParamModel} from "../../models/intent.parammodel";
import {JsonParam300} from "../../nativepage/impl/json.param.300";
import {JsonNativeSender} from "../../nativepage/impl/json.native.sender";
import {SelectedProdsResp} from "../../dto/response/ProductsResp";
import {SelectedProdsReq} from "../../dto/request/ProductsReq";
import {RespHeader} from "../../dto/base/Base";
import {SelectedProdsRespBody} from "../../dto/response/body/SelectedProdsRespBody";
import {JsonCmdId} from "../../nativepage/impl/json.cmdid";
import {IntentProductTag} from "../../models/intent.product.tag";
import {ProductBriefInfoUtil} from "../../models/product.briefinfo.util";

class ProductTagController {

    public items: Array<ProdBriefInfo> = [];
    private productTag:string=null;
    constructor(private netRequest: NetRequest,
                private $state: angular.ui.IStateService,
                private $stateParams: angular.ui.IStateParamsService,
                private $loading: ionic.loading.IonicLoadingService,

                private $ionicHistory:ionic.navigation.IonicHistoryService
    ) {

        this.loadData();
    }

    private loadData() {
      if(Constants.IS_NATIVE){
          this.withNativeLoadData();
      }else{
          var intentProductTag:IntentProductTag=IntentCookies.readIntent(key_intent_product_tag);
          if(intentProductTag==null||intentProductTag.tag==null){
              return ;
          }
          this.productTag=intentProductTag.tag;
          this.withJsLoadData();
      }
    }


    // //根据periodUnit的值转化为时间单位，0->分钟，1->小时，2->日；同时把最快放款时间转化为 分钟 放入 loanMinute ，便于通过借款时间排序
    // secMinDay(productList: Array<ProdBriefInfo>) {
    //     for (let i = 0; i < productList.length; i++) {
    //         productList[i]["periodUnit"] = (productList[i]["periodUnit"] == "0") ? "日" : "月";
    //         if (productList[i]["putMoneyTimeUnit"] == "0") {
    //
    //             productList[i]["putMoneyTimeUnit"] = "分钟";
    //
    //         } else if (productList[i]["putMoneyTimeUnit"] == "1") {
    //
    //             productList[i]["putMoneyTimeUnit"] = "小时";
    //         } else {
    //
    //             productList[i]["putMoneyTimeUnit"] = "日";
    //         }
    //     }
    //
    //     return productList;
    //
    // }

    withJsLoadData(){
       if(this.productTag==null){
           return ;
       }

        var helloCtrl = this;
        console.log("netInstance is null?" + (this.netRequest == null));
        // var req: BasicSearchReq = new BasicSearchReq();
        var req:SelectedProdsReq=new SelectedProdsReq();
        req.header = this.netRequest.buildRequestHeader();

        var vm = this;
        vm.$loading.show({
            template: Constants.MSG_LOADING,
        });


        this.netRequest.doGetProductsByTag(this.productTag,req, {
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
                            if (body != null && body.selectedProds != null) {
                                helloCtrl.items = body.selectedProds;
                                //todo update ui
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
    withNativeLoadData(){
        this.withJsLoadData()
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

    goBack(){

        var backview=this.$ionicHistory.backView();
        var forwardview=this.$ionicHistory.forwardView();
        if(forwardview){

            forwardview.destroy();
        }
        if(backview){
            backview.go();
        }else{
            alert("goback");
            forwardview.go();
        }

    }
}
ProductTagController.$inject = [
    EasycashServicesName.NetRequestService,
    "$state",
    "$stateParams",
    "$ionicLoading",
    "$ionicHistory"
];
export {ProductTagController}
