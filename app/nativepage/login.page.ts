import {LoginController} from "../moduleloginregist/login/login.controller";
import {RouterNativeName} from "./router.native.name";
import {EasycashServiceModule} from "../services/services.module";
function loginpageRoute($stateProvider, $urlRouterProvider) {
     $stateProvider.state(RouterNativeName.loginPage, {
        url: RouterNativeName.newRouterUrl(RouterNativeName.loginPage),
        controller: LoginController,
        controllerAs: 'vm',
        templateUrl: function () {
            return "./../../html/moduleloginregist/login.html";
        }
    })
    $urlRouterProvider.otherwise(RouterNativeName.loginPage);
}

loginpageRoute.$inject = ["$stateProvider", "$urlRouterProvider"];

var LoginPageModule = angular.module(RouterNativeName.loginPage, ['ionic',EasycashServiceModule.name]);
LoginPageModule.config(loginpageRoute);

export {LoginPageModule}
