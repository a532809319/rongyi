import * as HelloControllerModule from "./hello.controller";
import {IntentProduct} from "./../models/IntentProduct";
import {IntentParamModel} from "./../models/intent.parammodel";
import {ProductDetailController} from "./../moduleproduct/details/product.detail.controller";
import {IntentProductDetail} from "./../models/intent.product.detail";
import {ProductListController} from "./../moduleproduct/list/product.list.controller";
import {ProductLoanController} from "../moduleproduct/loan/product.loan.controller";
import {HomeSearchController} from "../modulehome/search/home.search.controller";
import {IntentHomeSearch} from "../models/intent.home.search";

function HelloRoute($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state("index", {
            url: '',
            controller: ProductListController,
            controllerAs: 'vm',
            templateUrl: function () {
                console.log("加载hello.component");

                //ok
                //  return "label.component.html";
                var isMain = true;
                if (isMain) {
                    return "./modulehome/home/home.main.html";


                 // return "./../first/new/rybring.products.detail.html";
                } else {
                    return "hello.component.html";
                }
            }
        })
         .state("testpage", {
            url: '/testpage',
            //传入参数
            params: IntentParamModel(IntentProduct),
            controller: HelloControllerModule.HelloController,
            controllerAs: 'vm',
            templateUrl: function () {
                console.log("templateUrl test page loaded");
                return 'test.html';
            }
        })
        .state("productlist", {
            url: "/productlist",
            controller: ProductListController,
            controllerAs: 'vm',
            templateUrl: function () {
                return "./moduleproduct/products.list.html";
            }
        })
        .state("productloan",{
            url:'/productloan',
            controller:ProductLoanController,
            controllerAs:"vm",
            templateUrl:function(){
                return  "./moduleproduct/products.loan.html";
            }
        })
        .state("homesearch",{
            url:"/homesearch",
            controller:HomeSearchController,
            controllerAs:"vm",
            cache:false,
            params:IntentParamModel(IntentHomeSearch),
            templateUrl:function(){
                return "./modulehome/search/home.search.html";
            }
        })
        .state("productdetail", {
            url: "/productdetail",
            params: IntentParamModel(IntentProductDetail),
            controller: ProductDetailController,
            controllerAs: 'vm',

            templateUrl: function () {
                return "./moduleproduct/products.detail.html";
            }
        });

        $urlRouterProvider.otherwise("index");

}
HelloRoute.$inject = ["$stateProvider", "$urlRouterProvider"];
export {HelloRoute};
