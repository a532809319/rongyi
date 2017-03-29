/**
 * Created by 79078_000 on 2016/9/18.
 */

// import {StarRateService} from "../../services/star.rate.service";
// class StarComponent implements angular.IComponentOptions {
//     templateUrl = function () {
//         return "./components/star/star.component.html";
//     }
//     bindings: {[binding: string]: string; } = { 
//         rate: "@",
//     };
//     controller = StarComponentController;
//     controllerAs = "vm"; 

//     constructor() {
//         console.log("创建StarComponent " + (this.controller == null))
//     }

// }
// class StarComponentController {
//     rate: string;
//     successRate: number;

//     constructor() {
//         console.log("创建StarComponentController")
//     }

//     $onInit() {
//         this.successRate = StarRateService.getStarRate(this.rate);
//     }
// }
// export {StarComponent};


import {StarRateService} from "../../services/star.rate.service";
class StarComponent implements angular.IComponentOptions {

    rate: string;
    successRate: number;

    templateUrl = function () {
        return "./components/star/star.component.html";
    }
    bindings: {[binding: string]: string; } = { 
        rate: "@",
    };

    controller = StarComponent;
    controllerAs = "vm"; 

    constructor() {
        console.log("创建StarComponent " + (this.controller == null))
    }
    
    $onInit() {
        this.successRate = StarRateService.getStarRate(this.rate);
    }
}

export {StarComponent};
