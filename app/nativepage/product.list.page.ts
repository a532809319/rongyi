
import {EasycashServiceModule} from "../services/services.module";
import {RouterNativeName} from "./router.native.name";
import {ProductListController} from "../moduleproduct/list/product.list.controller";

var productListPageModule=angular.module(RouterNativeName.productListPage,['ionic',EasycashServiceModule.name]);

productListPageModule.component(RouterNativeName.productListPage,{
    controller:ProductListController,
    controllerAs:'vm',
    templateUrl:function(){
        return "./../../html/moduleproduct/products.list.html";
    }
})

export {productListPageModule};


