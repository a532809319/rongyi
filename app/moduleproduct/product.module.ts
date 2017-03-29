/**
 * Created by 79078_000 on 2016/9/14.
 */
/// <reference path="./../../typings/index.d.ts" />

import {EasycashServiceModule} from "./../services/services.module";
import {ProductRoute} from "./product.route";
import {StarComponent} from "../components/star/star.component";
import {CommonUtil} from "../models/common.util";
import {LoginRegistModule} from "../moduleloginregist/loginregist.module";
import {ProductCompleteInforModule} from "./product.completeinfor.module";
import { ProductDetailTagComponent } from "../components/detailTag/productDetailTag.component";

var ProductModule = angular.module('productApp',
    [
        EasycashServiceModule.name,
        LoginRegistModule.name,
        ProductCompleteInforModule.name,
        'ionic',
    ])
    .component("starComponent",new StarComponent())

    .component("productTag",new ProductDetailTagComponent())

    .config(ProductRoute);


export {ProductModule};

//CommonUtil.isWeixinBrowser();
