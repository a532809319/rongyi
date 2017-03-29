
import {ZhuceController} from "./zhuce.controller";
import {IntentParamModel} from "../models/intent.parammodel";
import {DownLoadController} from "./download.controller";
/**
 * Created by 79078_000 on 2016/9/18.
 */

function ZhuceRoute($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state("zhuce", {
        url: '/zhuce',
        controller: ZhuceController,
        controllerAs: 'vm',
        params: IntentParamModel(null),
        templateUrl: function () {
            console.log("加载zhuceCenterx");
            return "./zhuce.html"; 
        }
    })
        .state("download", {
        url: '/download',
        controller: DownLoadController,
        controllerAs: 'vm',
        params: IntentParamModel(null),
        templateUrl: function () {
            console.log("加载zhuceCenter");
            return "./download.html";

        }
    })


    ;

    $urlRouterProvider.otherwise("zhuce");

}
ZhuceRoute.$inject = ["$stateProvider", "$urlRouterProvider"];
export {ZhuceRoute};

