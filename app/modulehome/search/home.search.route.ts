/**
 * Created by 79078_000 on 2016/9/18.
 */
import {HomeSearchController} from "./home.search.controller";

function HomeSearchRoute($stateProvider: angular.ui.IStateProvider,
                         $urlRouterProvider: angular.ui.IUrlRouterProvider) {
    $stateProvider.state("homeSearchIndex", {
        url: '/homeSearchIndex',
        cache: false,
        controller: HomeSearchController,
        controllerAs: 'vm',
        templateUrl: function () {
            console.log("加载homeSearch");
            return "../html/modulehome/search/home.search.html";
        }
    });

    $urlRouterProvider.otherwise("/homeSearchIndex");
}
HomeSearchRoute.$inject = ['$stateProvider', '$urlRouterProvider'];
export {HomeSearchRoute};
