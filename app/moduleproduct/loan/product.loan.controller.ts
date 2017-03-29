import {NetRequest, NetRequestCode} from "../../services/easycash.network";
import {EasycashServicesName} from "../../services/services.module";
import {IntentParamModel} from "../../models/intent.parammodel";
import {SelectedProdsReq} from "../../dto/request/ProductsReq";
import {RespHeader} from "../../dto/base/Base";
import {SelectedProdsResp} from "../../dto/response/ProductsResp";
import {SelectedProdsRespBody} from "../../dto/response/body/SelectedProdsRespBody";
import {ProdBriefInfo} from "../../dto/entity/ProdBriefInfo";
import {IntentProductDetail} from "../../models/intent.product.detail";
import {ItemPlatform} from "../../models/item.platform";

class ProductLoanController implements angular.IComponentController {

    public itemPlatform: ItemPlatform = new ItemPlatform();
    public items: Array<ProdBriefInfo> = [];

    constructor(private netRequest: NetRequest,
                private $state: angular.ui.IStateService,
                private $stateParams: angular.ui.IStateParamsService) {

        this.loadData();
    }

    private loadData() {
        var ctrl = this;
        console.log("netInstance is null?" + (this.netRequest == null));
        var req: SelectedProdsReq = new SelectedProdsReq();
        req.header = this.netRequest.buildRequestHeader();

        this.netRequest.queryAnticashProduct(req, {
            onFailure(e: any) {

            },
            onSuccess(json: any) {
                var resp: SelectedProdsResp = json;
                if (resp != null) {
                    var header: RespHeader = resp.header;
                    if (NetRequestCode.SUCCESS === header.respCode) {
                        var body: SelectedProdsRespBody = resp.body;
                        if (body != null && body.selectedProds != null) {
                            ctrl.items = body.selectedProds;
                        }
                        //todo update ui
                    }
                }
                console.log("---------" + ctrl.items.length);
                //ctrl.$scope.$evalAsync(function () {  });//需要手动刷新
            }
        });


    }

    forwardProductDetail(prod: ProdBriefInfo) {
        if (prod == null || prod.productId == null) {
            return;
        }
        var intent: IntentProductDetail = new IntentProductDetail();
        intent.productId = prod.productId;
        this.$state.go("productdetail", IntentParamModel(intent));
    }


    private parseWeixinAuthcode(): string {
        var location = window.location.search;
        if (location && location.indexOf("&") != -1 && location.indexOf("code=") != -1) {
            var start = location.indexOf("code=") + 5;
            var end = location.lastIndexOf("&");

            var code = location.substring(start, end);

            alert("OK" + location + "\r\n" + code + "\r\n" + start + "," + end);

            // var openIdUrl = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx5f52672571705506&secret=51ea7bdf86de5f283f9569b89d9662e9&code=" + code + "&grant_type=authorization_code";
            // window.location.href = openIdUrl;

            //    this.netRequest.doWeixinAuthorizon(code,{
            //        onFailure(e:any){
            //             window.alert("出错了"+angular.toJson(e));
            //        },
            //        onSuccess(json:any){
            //            window.alert("POST data:"+angular.toJson(json));
            //        }
            //    });
            return code;
        }
        return null;
        ;
    }

}
ProductLoanController.$inject = [EasycashServicesName.NetRequestService, "$state", "$stateParams"];
export {ProductLoanController};
