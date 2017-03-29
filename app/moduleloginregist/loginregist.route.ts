import {IntentParamModel} from "./../models/intent.parammodel";
import {LoginController} from "./login/login.controller";
import {RegistController} from "./regist/regist.controller";
import {ResetPwdController} from "./pwdreset/resetpwd.controller";
import {IntentLogin} from "../models/intent.login";
import {IntentRegist} from "../models/intent.regist";

function LoginRegistRoute($stateProvider, $urlRouterProvider:angular.ui.IUrlRouterProvider) {

    $stateProvider
        .state("login", {
            url: '/login',
            controller: LoginController,
            controllerAs: 'vm',
            /*不强制IntentLogin参数*/
            params: IntentParamModel(null),
            templateUrl: function () {
                console.log("加载login ");
                return "./moduleloginregist/login.html";
            }
        })
        .state("regist", {
            url: '/regist',
            controller: RegistController,
            controllerAs: 'vm',
            /*不强制IntentRegist参数*/
            params: IntentParamModel(null),
            templateUrl: function () {
                console.log("加载regist");
                return "./moduleloginregist/regist.html";
            }
        })
        .state("pwdreset", {
            url: "/pwdreset",
            controller: ResetPwdController,
            controllerAs: 'vm',
            templateUrl: function () {
                return "./moduleloginregist/pwdreset.html";
            }
        });


    $urlRouterProvider.otherwise("login");

}
LoginRegistRoute.$inject = ["$stateProvider", "$urlRouterProvider"];
export {LoginRegistRoute};
