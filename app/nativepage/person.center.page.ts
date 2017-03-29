import {RouterNativeName} from "./router.native.name";
import {PersonCenterController} from "../modulepersonal/person.center.controller";
import {EasycashServiceModule} from "../services/services.module";
function personCenterPageRoute($stateProvider, $urlRouterProvider) {
    $stateProvider.state(RouterNativeName.personCenterPage, {
        url: RouterNativeName.newRouterUrl(RouterNativeName.personCenterPage),
        controller: PersonCenterController,
        controllerAs: "vm",
        templateUrl: function () {
            return "./../../html/modulehome/personal/person.center.html";
        }
    })
    $urlRouterProvider.otherwise(RouterNativeName.personCenterPage);
}
personCenterPageRoute.$inject = ["$stateProvider", "$urlRouterProvider"];

var personCenterPageModule = angular.module(RouterNativeName.personCenterPage, ['ionic', EasycashServiceModule.name]);
personCenterPageModule.config(personCenterPageRoute);

export {personCenterPageModule}
