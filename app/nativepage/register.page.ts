import {LoginController} from "../moduleloginregist/login/login.controller";
import {RouterNativeName} from "./router.native.name";
import {EasycashServiceModule} from "../services/services.module";
import {RegistController} from "../moduleloginregist/regist/regist.controller";
import {IntentParamModel} from "../models/intent.parammodel";
function registerPageRoute($stateProvider, $urlRouterProvider) {
    $stateProvider.state(RouterNativeName.registerPage, {
        url: RouterNativeName.newRouterUrl(RouterNativeName.registerPage),
        /*不强制IntentRegist参数*/
        params: IntentParamModel(null),
        controller: RegistController,
        controllerAs: 'vm',
        templateUrl: function () {
            return "./../../html/moduleloginregist/regist.html";
        }
    })
    $urlRouterProvider.otherwise(RouterNativeName.registerPage);
}

registerPageRoute.$inject = ["$stateProvider", "$urlRouterProvider"];

var registerPageModule = angular.module(RouterNativeName.registerPage, ['ionic', EasycashServiceModule.name]);
registerPageModule.config(registerPageRoute);

export {registerPageModule}
