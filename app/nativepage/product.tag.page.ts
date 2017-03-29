import {EasycashServiceModule} from "../services/services.module";
import {RouterNativeName} from "./router.native.name";
import {ProductTagController} from "../modulecreditloan/tags/product.tag.controller";

var productTagPageModule=angular.module(RouterNativeName.productTagPage,
    ['ionic',EasycashServiceModule.name]);

productTagPageModule.component(RouterNativeName.productTagPage,{
    controller:ProductTagController,
    controllerAs:'vm',
    templateUrl:function(){
        return "./../../html/moduleproduct/products.tag.html";
    }
})

export {productTagPageModule};


