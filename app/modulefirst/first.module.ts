/**
 * Created by 79078_000 on 2016/9/18.
 */

//import {StarComponent} from "../components/star/star.component";
import {FirstRoute} from "./first.route";
import {EasycashServiceModule} from "../services/services.module";
var FirstModule=angular.module("FirstApp",
    [
        EasycashServiceModule.name,
        "ionic",


    ])

    ;

//FirstModule.component("starComponent",new StarComponent());

FirstModule.config( FirstRoute);


export {FirstModule};


// var creditLoanModule = angular.module("creditLoanApp",
//     [
//         EasycashServiceModule.name,
//         ProductModule.name,
//         'ionic'
//     ]);
// creditLoanModule.config(creditLoanRoute);
// export {creditLoanModule}
