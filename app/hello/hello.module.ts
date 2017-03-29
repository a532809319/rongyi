/// <reference path="./../../typings/index.d.ts" />
import "./transformer/transformer.factory";
import { EasycashServiceModule, EasycashServicesName} from "./../services/services.module";


import { HelloAppComponent } from "./hello.component";
import {HelloController}  from "./hello.controller";
import {HelloRoute} from "./hello.route";






import * as LoginRegModule from "./../moduleloginregist/loginregist.module";





var helloapp = angular.module('helloapp',
    ['helloapp.transformer',
        //   LoginRegModule.LoginRegistModule.name,
        EasycashServiceModule.name,
        'ionic',
    ])

    //<app-component> </app-component>
    //  .component("appComponent", HelloAppComponent)
    /*  .controller("httpctrl", function ($http) {
          console.log("httpctrl created");

          var httpctrl = this;
          httpctrl.data = "逗我呢";
          httpctrl.doGetData = function () {

              $http({

                  method: 'jsonp',
                  url: 'http://192.168.2.138:6100/api/prod/cashselected?callback=JSON_CALLBACK',
                  // params:{
                  //     'require': data
                  // }
                  headers: {
                      //"Access-Control-Allow-Origin": '*',
                      // "Content-Type":'application/json',
                  }
              }).success(function (data, status, headers, config) {
                  console.log("data--" + angular.toJson(data));
                  httpctrl.data = data + "/" + status + "/" + headers;


              }).error(function (data, status, headers, config) {
                  console.log("err data " + data + "," + status);
                  httpctrl.data = data + "/" + status + "/" + headers;
              });
          }
      })*/



    .config(HelloRoute);

console.log("------------------------输出:" + (LoginRegModule == null));
export {helloapp};
