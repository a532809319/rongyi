import {NetRequest} from "./easycash.network";
import {RouterParamService} from "./easycash.routerparam";
import {BreaklineFilter} from "./breakline.filter";
import {NumberDotFilter} from "./number.dot.filter";
import {AppStatusService} from "./app.status.service";


export namespace EasycashServicesName {
    export const NetRequestService: string = "NetRequestService";
    export const RouterParamService: string = "RouterParamService";
    export const BreaklineFilter: string = "BreaklineFilter";
    export const NumberDotFilter: string = "NumberDotFilter";
    export const StarRateFilter: string = "StarRateService";
    export const AppStatusService: string = "AppStatusService";
}


var EasycashServiceModule = angular.module("easycashServiceModule", ['ionic'])
// .factory("NetRequestService",  function($http){
//     console.log("NetRequestService created a");
//     return new easycash.network.NetRequest($http);
// });
    .factory(EasycashServicesName.NetRequestService, ['$http', function ($http) {
        return new NetRequest($http);

    }])
    .factory(EasycashServicesName.RouterParamService, function () {
        return new RouterParamService();
    })
    .factory(EasycashServicesName.AppStatusService, function () {
        return new AppStatusService();
    })
    .filter(EasycashServicesName.BreaklineFilter, function () {
        return BreaklineFilter;
    })
    .filter(EasycashServicesName.NumberDotFilter, function () {
        return new NumberDotFilter().getProductFee;
    });

export {EasycashServiceModule};



