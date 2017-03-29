/**
 * Created by 79078_000 on 2016/9/18.
 */

import {PersonCenterRoute} from "./person.center.route";
import {StarComponent} from "../components/star/star.component";
var PersonCenterModule=angular.module("personCenterApp",
    ["ionic"]);

PersonCenterModule.component("starComponent",new StarComponent());

PersonCenterModule.config( PersonCenterRoute);


export {PersonCenterModule};
