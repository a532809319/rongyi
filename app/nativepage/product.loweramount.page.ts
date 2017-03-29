import {EasycashServiceModule} from "../services/services.module";
import {RouterNativeName} from "./router.native.name";
import {ProductLowerAmountController} from "../modulecreditloan/tags/product.lower.amount.controller";

var productLowerAmountPageModule=angular.module(RouterNativeName.productLowerAmountPage,
    ['ionic',EasycashServiceModule.name]);

productLowerAmountPageModule.component(RouterNativeName.productLowerAmountPage,{
    controller:ProductLowerAmountController,
    controllerAs:'vm',
    templateUrl:function(){
        return "./../../html/moduleproduct/product.lower.amount.loan.html";
    }
})

export {productLowerAmountPageModule};


