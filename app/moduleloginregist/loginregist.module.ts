import "./login/login.module.ts";
import {LoginRegistRoute} from "./loginregist.route";
import {EasycashServiceModule} from "./../services/services.module";

var LoginRegistModule = angular.module("loginRegistApp",
    ["ionic",
        EasycashServiceModule.name,
    ]);

LoginRegistModule.config(LoginRegistRoute);


export {LoginRegistModule};
