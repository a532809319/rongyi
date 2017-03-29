import {FirstController} from "./first.controller";
/**
 * Created by 79078_000 on 2016/9/18.
 */

function FirstRoute($stateProvider, $urlRouterProvider) {

    $stateProvider.state("box", {
        url: '/box',
        controller: FirstController,
        controllerAs: 'vm',
        templateUrl: function () {
            console.log("加载firstCenter");
            return "./../html/first/box.html";

        }
    });

    $urlRouterProvider.otherwise("box");

}
FirstRoute.$inject = ["$stateProvider", "$urlRouterProvider"];
export {FirstRoute};

