/**
 * Created by 79078_000 on 2016/9/18.
 */
import {PersonCenterController} from "./person.center.controller";
function PersonCenterRoute($stateProvider, $urlRouterProvider) {

    $stateProvider.state("personcenterIndex", {
        url: '/personcenterIndex',
        controller: PersonCenterController,
        controllerAs: 'vm',
        templateUrl: function () {
            console.log("加载personCenter");
            return "../html/modulehome/personal/person.center.html";
        }
    });

    $urlRouterProvider.otherwise("personcenterIndex");

}
PersonCenterRoute.$inject = ["$stateProvider", "$urlRouterProvider"];
export {PersonCenterRoute};
