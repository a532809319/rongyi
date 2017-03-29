import {RouterNativeName} from "./router.native.name";
import {EasycashServiceModule} from "../services/services.module";
import {ProductDetailController} from "../moduleproduct/details/product.detail.controller";
import {IntentProductDetail} from "../models/intent.product.detail";
import {IntentParamModel} from "../models/intent.parammodel";
import {ProductDetailTagComponent} from "../components/detailTag/productDetailTag.component";


var productDetailPageModule = angular.module(RouterNativeName.productDetailPage, ['ionic', EasycashServiceModule.name]);
productDetailPageModule.component(RouterNativeName.productDetailPage,{
    controller: ProductDetailController,
    controllerAs: 'vm',
    templateUrl: function () {
        return "./../../html/moduleproduct/products.detail.html";
    }
});
productDetailPageModule.component("productTag",new ProductDetailTagComponent());

export {productDetailPageModule}
