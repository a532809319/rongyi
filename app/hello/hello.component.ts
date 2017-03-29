/// <reference path="./../../typings/index.d.ts" />

import {HelloController}  from "./hello.controller";


function HelloAppComponent() {
    console.log("HelloAppComponent created");
    return {
        templateUrl: './../html/hello.component.html',
        controller: HelloController,
        controllerAs: 'vm',
    }
}
export {HelloAppComponent};




//var helloapp= angular.module('helloapp', ['helloapp.transformer', 'easycash.network', 'ionic'])
//     //<app-component> </app-component>
//     .component("appComponent", HelloAppComponent)
//     .controller("httpctrl", function ($http) {
//         console.log("httpctrl created");
//         var httpctrl = this;
//         httpctrl.data = "逗我呢";
//         httpctrl.doGetData = function () {
//             $http({
//                 method: 'jsonp',
//                 url: 'http://192.168.2.138:6100/api/prod/cashselected?callback=JSON_CALLBACK',
//                 // params:{  
//                 //     'require': data  
//                 // }  
//                 headers: {
//                     //"Access-Control-Allow-Origin": '*', 
//                     // "Content-Type":'application/json',
//                 }
//             }).success(function (data, status, headers, config) {
//                 console.log("data--" + angular.toJson(data));
//                 httpctrl.data = data + "/" + status + "/" + headers;


//             }).error(function (data, status, headers, config) {
//                 console.log("err data " + data + "," + status);
//                 httpctrl.data = data + "/" + status + "/" + headers;
//             });
//         }
//     })
//     .config(HelloRoute);

// export {helloapp};    