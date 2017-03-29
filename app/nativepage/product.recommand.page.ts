import {EasycashServiceModule} from "../services/services.module";
import {RouterNativeName} from "./router.native.name";
import {HomeRecommandCreditController} from "../modulecreditloan/home.recommand.credit.controller";

var productRecommandPageModule=angular.module(RouterNativeName.productRecommandPage,
    ['ionic',EasycashServiceModule.name]);

productRecommandPageModule.component(RouterNativeName.productRecommandPage,{
    controller:HomeRecommandCreditController,
    controllerAs:'vm',
    templateUrl:function(){
        return "./../../html/modulehome/home/home.recommand.html";
    }
})

export {productRecommandPageModule};


