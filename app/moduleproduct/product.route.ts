/**
 * Created by 79078_000 on 2016/9/14.
 */
import {IntentParamModel} from "./../models/intent.parammodel";
import {ProductDetailController} from "./../moduleproduct/details/product.detail.controller";
import {IntentProductDetail} from "./../models/intent.product.detail";
import {ProductListController} from "./../moduleproduct/list/product.list.controller";
import {ProductLoanController} from "../moduleproduct/loan/product.loan.controller";
import {HomeSearchController} from "../modulehome/search/home.search.controller";
import {IntentHomeSearch} from "../models/intent.home.search";
import {IntentMarks} from "../models/intent.marks";
import {MarksRootController} from "../components/marks/marks.root.component";
import {ThirdWebpageController} from "./details/third.webpage.controller";
import {IntentThirdWebpage} from "../models/intent.thirdwebpage";


function ProductRoute($stateProvider, $urlRouterProvider) {

    $stateProvider

    // .state("index", {
    //     url: '',
    //     controller: ProductListController,
    //     controllerAs: 'vm',
    //     templateUrl: function () {
    //         console.log("加载product.component");
    //         return "./modulehome/home/home.main.html";
    //     }
    // })
        .state("productlist", {
            url: "/productlist",
            controller: ProductListController,
            controllerAs: 'vm',
            templateUrl: function () {
                return "./moduleproduct/products.list.html";
            }
        })
        .state("productloan", {
            url: '/productloan',
            controller: ProductLoanController,
            controllerAs: "vm",
            templateUrl: function () {
                return "./moduleproduct/products.loan.html";
            }
        })
        .state("homesearch", {
            url: "/homesearch",
            controller: HomeSearchController,
            controllerAs: "vm",
            params: IntentParamModel(IntentHomeSearch),
            templateUrl: function () {
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
        })
        .state("completeinfor", {
            url: '/completeinfor',
            params: IntentParamModel(IntentMarks),
            controller: MarksRootController,
            templateUrl: function () {
                console.log("加载信息补全");
                return "./moduleproduct/product.completeinfor.html";
            }
        }).state("thirdwebpage", {
        url: '/thirdwebpage',
        params: IntentParamModel(IntentThirdWebpage),
        controller: ThirdWebpageController,
        controllerAs: 'vm',
        templateUrl: function () {
            console.log("加载第三方页面");
            return "./moduleproduct/third.webpage.html"
        }
    });



    //  $urlRouterProvider.otherwise("index");  //首页-主页
    $urlRouterProvider.otherwise("productlist");
}
ProductRoute.$inject = ["$stateProvider", "$urlRouterProvider"];
export {ProductRoute};
