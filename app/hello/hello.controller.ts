/// <reference path="./../../typings/index.d.ts" />
import * as Transformer from "./transformer/transformer.factory";
import {NetRequest, NetRequestCode} from "./../services/easycash.network";
import {EasycashServicesName} from "./../services/services.module";
import {IntentProduct} from "./../models/IntentProduct";
import {DATA} from "./../models/intent.parammodel";
import {SelectedProdsReq} from "./../dto/request/ProductsReq";
import {ReqHeader, RespHeader} from "./../dto/base/Base";
import {SelectedProdsResp} from "./../dto/response/ProductsResp";
import {SelectedProdsRespBody} from "./../dto/response/body/SelectedProdsRespBody";

class HelloController {
    private input: string;
    private method: string;
    private result: string;

    public items: any = [];


    constructor(
        private transformer: Transformer.ITransformerService,
        private netRequest: NetRequest,
        private $state: angular.ui.IStateService,
        private $stateParams: angular.ui.IStateParamsService) {
        this.method = "toLowerCase";
        this.input = "Input letters";
        console.log("HelloController created");

        // for (var i = 0; i < 10; i++) {
        //     this.items.push("item" + i);
        // }
        var intent: IntentProduct = this.$stateParams[DATA];
        console.log("----" + angular.toJson(intent));

        this.loadData();

    }

    private loadData() {
        var helloCtrl = this;
        console.log("netInstance is null?" + (this.netRequest == null));
        var req: SelectedProdsReq = new SelectedProdsReq();
        req.header = new ReqHeader();

        this.netRequest.queryCashProduct(req, {
            onFailure(e: any) {

            },
            onSuccess(json: any) {
                var resp: SelectedProdsResp = json;
                if (resp != null) {
                    var header: RespHeader = resp.header;
                    if (NetRequestCode.SUCCESS === header.respCode) {
                        var body: SelectedProdsRespBody = resp.body;
                        helloCtrl.items = body.selectedProds;
                        //todo update ui
                    }
                }
                console.log("---------" + helloCtrl.items.length);
                //helloCtrl.$scope.$evalAsync(function () {  });//需要手动刷新
            }
        });
    }

    transform() {
        if ('toLowerCase' === this.method) {
            this.result = this.transformer.toLowerCase(this.input);
        } else if ('toUpperCase' === this.method) {
            this.result = this.transformer.toUpperCase(this.input);
        }


        var intent: IntentProduct = new IntentProduct();
        intent.logoUrl = "logoUrl";
        intent.prodDesc = this.method;
        intent.productId = "0";
        intent.productName = this.result;


        // this.$state.go("testpage", IntentParamModel(intent)); //OK

    }

    forwardProductList() {
        this.$state.go("");
    }
}

HelloController.$inject = ["transformer", EasycashServicesName.NetRequestService, "$state", "$stateParams"];
export {HelloController};
