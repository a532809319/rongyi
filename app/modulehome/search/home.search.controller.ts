import {NetRequest, NetRequestCallback, NetRequestCode} from "../../services/easycash.network";
import {EasycashServicesName} from "../../services/services.module";
import {IntentParamModel, DATA} from "../../models/intent.parammodel";
import {BasicSearchReq} from "../../dto/request/BasicSearchReq";
import {BasicSearchReqBody} from "../../dto/request/body/BasicSearchReqBody";
import {RespHeader} from "../../dto/base/Base";
import {SearchedProdsResp} from "../../dto/response/SearchedProdsResp";
import {SearchedProdsRespBody} from "../../dto/response/body/SearchedProdsRespBody";
import {ProdBriefInfo} from "../../dto/entity/ProdBriefInfo";
import {IntentProductDetail} from "../../models/intent.product.detail";
import {LoadDuration} from "../../dto/entity/LoadDuration";
import {IntentHomeSearch} from "../../models/intent.home.search";
import {IntentCookies, key_intent_product_detail} from "../../models/intent.cookies";
import {Constants} from "../../models/constants";
import {JsonParam300} from "../../nativepage/impl/json.param.300";
import {JsonCmdId} from "../../nativepage/impl/json.cmdid";
import {JsonNativeSender} from "../../nativepage/impl/json.native.sender";
import {ItemPlatform} from "../../models/item.platform";
import {ProdTypes} from "../../dto/entity/ProdTypes";
import {SearchTitle} from "../../dto/entity/SearchTitle";
import {SearchEnum} from "../../models/searchEnum";
import {ProductBriefInfoUtil} from "../../models/product.briefinfo.util";


class HomeSearchController {
    public itemPlatform: ItemPlatform = new ItemPlatform();
    private isSearching: boolean;

    sortType: string = "";
    loanAmount: string = "";
    prodType: ProdTypes = new ProdTypes();


    public items: Array<ProdBriefInfo> = [];
    public prodTypes: Array<ProdTypes> = [];
    public searchTitle: SearchTitle = new SearchTitle();
    private popover: any;

    constructor(private netRequest: NetRequest,
        private $state: angular.ui.IStateService,
        private $ionicHistory: ionic.navigation.IonicHistoryService,
        private $stateParams: angular.ui.IStateParamsService,
        private $ionicPopover: ionic.popover.IonicPopoverService,
        private $scope: angular.IScope) {

        this.isSearching = false;

        var intentHomeSearch: IntentHomeSearch = this.$stateParams[DATA];

        if (intentHomeSearch) {
            var criteria = intentHomeSearch.basicSearchCriteria;
            this.loanAmount = criteria.loanAmount;

        } else {

        }

        console.log("-------------测试搜索" + angular.toJson(intentHomeSearch));

        setTimeout(this.doSearchType(), 1000);

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

    //打开或者关闭浮动框

    openAndClosePopover($event, openUrl, opclo, optype) {
        var self = this;
        var openAndCloseCtrl = this.$ionicPopover.fromTemplateUrl(openUrl, {
            scope: self.$scope,
            // backdropClickToClose: false
        })
        if (opclo == "open") {
            openAndCloseCtrl.then(function (popover) {
                self.popover = popover;

                //不明白这一步，没有这一行代码浮动框无法调用controller方法
                self.$scope["vm"] = self;

                self.popover.show($event);
            })
        } else {
            self["queryInfo"] = opclo;
            self["type"] = optype;
            this.closePopover(self);
        }

        this.$scope.$on('popover.hide', function () {

        })
    }

    //关闭浮动框
    closePopover(self) {

        console.log(self["queryInfo"]);
        self.popover.remove();

        switch (self["type"]) {
            case "sort":
                this.sortType = self["queryInfo"];
                break;
            case "money":
                this.loanAmount = self["queryInfo"];
                break;
            default:
                this.prodType = self["queryInfo"];
                break;
        }
        this.doSearchBy();

    }

    //产品按照条件搜索
    doSearchBy() {

        if (this.isSearching) {
            return;
        }

        var req = new BasicSearchReq();
        req.header = this.netRequest.buildRequestHeader();

        var body = new BasicSearchReqBody();
        body.minLoanAmount = this.loanAmount.split("-")[0];
        body.maxLoanAmount = this.loanAmount.split("-")[1];
        body.prodTypeId = this.prodType.prodTypeId;
        this.loanAmount = (body.minLoanAmount === "") ? (SearchEnum.defaultMoneyName) : this.loanAmount;
        this.searchTitle.typeName = (this.prodType.prodTypeName === undefined) ? SearchEnum.defultTypeName : this.prodType.prodTypeName;
        this.searchTitle.sortName = (this.sortType === "") ? SearchEnum.defaultSortName : SearchEnum[this.sortType];
        this.searchTitle.moneyName = ((body.minLoanAmount === body.maxLoanAmount) ? (body.minLoanAmount + "+") : this.loanAmount) || this.searchTitle.moneyName;


        //首次加载页面，没有选中金额与类型，不传body
        if (this.searchTitle.typeName != SearchEnum.defultTypeName
            || this.searchTitle.moneyName != SearchEnum.defaultMoneyName) {
            req.body = body;
        }

        const ctrl = this;
        ctrl.isSearching = true;
        this.netRequest.doSearch(req, {
            onFailure(e: any) {
                ctrl.isSearching = false;
            },
            onSuccess(json: any) {
                ctrl.isSearching = false;
                var resp: SearchedProdsResp = json;
                if (resp) {
                    var header = resp.header;
                    if (NetRequestCode.SUCCESS === header.respCode) {
                        var respBody: SearchedProdsRespBody = resp.body;
                        if (respBody) {
                            if (respBody.searchedProds != null) {
                                ctrl.items = respBody.searchedProds;
                                ProductBriefInfoUtil.secMinDayAndSort(ctrl.items, ctrl.sortType);
                            } else {
                                ctrl.items = [];
                            }
                        }
                    }
                }
            }
        })
    }


    //按照产品类型筛选产品，首次加载页面时调用，查询产品的所有类型
    doSearchType() {

        if (this.isSearching) {
            return;
        }

        var req = new BasicSearchReq();
        req.header = this.netRequest.buildRequestHeader();

        const typ = this;
        this.isSearching = true;

        this.netRequest.doSearchType(req, {
            onFailure(e: any) {
                typ.isSearching = false;
            },
            onSuccess(json: any) {
                typ.isSearching = false;
                console.log("---按照产品类型搜索---" + angular.toJson(json));
                var resp: SearchedProdsResp = json;

                if (resp) {
                    var header = resp.header;
                    if (NetRequestCode.SUCCESS === header.respCode) {
                        var respBody: SearchedProdsRespBody = resp.body;
                        if (respBody) {
                            if (respBody.productTypes != null) {
                                typ.prodTypes = respBody.productTypes;
                            } else {
                                typ.prodTypes = [];
                            }

                            typ.doSearchBy();
                        }
                    }
                }
            }
        })

    }


    private doBack() {
        this.$ionicHistory.goBack(-1);
    }
}
HomeSearchController.$inject = [EasycashServicesName.NetRequestService,
    "$state", "$ionicHistory",
    "$stateParams", "$ionicPopover", "$scope"];

export {HomeSearchController};
