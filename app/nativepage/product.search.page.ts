

import {RouterNativeName} from "./router.native.name";
import {EasycashServiceModule} from "../services/services.module";
import {HomeSearchController} from "../modulehome/search/home.search.controller";
import {IntentHomeSearch} from "../models/intent.home.search";
import {IntentParamModel} from "../models/intent.parammodel";

function productSearchPageRoute($stateProvider,$urlRouterProvider){
    $stateProvider.state(RouterNativeName.productSearchPage,{
        url:RouterNativeName.newRouterUrl(RouterNativeName.productSearchPage),
        params: IntentParamModel(IntentHomeSearch),
        controller:HomeSearchController,
        controllerAs:'vm',
        templateUrl:function(){
            return "./../../html/modulehome/search/home.search.html";
        }
    });
    $urlRouterProvider.otherwise(RouterNativeName.productSearchPage);
}
productSearchPageRoute.$inject=["$stateProvider","$urlRouterProvider"];

var productSearchPageModule=angular.module(RouterNativeName.productSearchPage,['ionic',EasycashServiceModule.name]);

productSearchPageModule.config(productSearchPageRoute);
export {productSearchPageModule}
