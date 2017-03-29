import {RouterNameService} from "../services/routename.service";
import {HomeRecommandCreditController} from "./home.recommand.credit.controller";
import {ProductLowerAmountController} from "./tags/product.lower.amount.controller";
import {ProductTagController} from "./tags/product.tag.controller";
/**
 * Created by 79078_000 on 2016/10/30.
 */

function creditLoanRoute($stateProvider: angular.ui.IStateProvider, $urlRouterState: angular.ui.IUrlRouterProvider) {
    $stateProvider.state(RouterNameService.homeRecommandCreditPage, {
        url: RouterNameService.newRouterUrl(RouterNameService.homeRecommandCreditPage),
        controller: HomeRecommandCreditController,
        controllerAs: 'vm',
        templateUrl: function () {
            console.log("加载首页--产品推荐");
            return "./modulehome/home/home.recommand.html";
        }
    })
    $stateProvider.state(RouterNameService.productLowerAmountLoanPage, {
        url: RouterNameService.newRouterUrl(RouterNameService.productLowerAmountLoanPage),
        // params:IntentParamModel(IntentProductLowerAmount)
        controller: ProductLowerAmountController,
        controllerAs: 'vm',
        cache:false,
        templateUrl: function () {
            console.log("加载小额借款");
            return "./moduleproduct/product.lower.amount.loan.html";
        }
    });

    $stateProvider.state(RouterNameService.productTagListPage, {
        url: RouterNameService.newRouterUrl(RouterNameService.productTagListPage),
        controller: ProductTagController,
        controllerAs: 'vm',
        cache:false,
        templateUrl: function () {
            console.log("加载TAG类型的产品");
            return "./moduleproduct/products.tag.html";
        }
    });

    $urlRouterState.otherwise(RouterNameService.homeRecommandCreditPage);
}
creditLoanRoute.$inject = ["$stateProvider", "$urlRouterProvider"];
export {creditLoanRoute}
