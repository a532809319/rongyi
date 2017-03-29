
import {RouterNameService} from "../services/routename.service";
import {HomeComponent} from "./home.component";
import {EasycashServicesName, EasycashServiceModule} from "../services/services.module";
import {NetRequest} from "../services/easycash.network";
var productHomePage=angular.module(RouterNameService.productHomePage,[EasycashServiceModule.name,'ionic']);
productHomePage.component("homeComponent",new HomeComponent(null));
export {productHomePage};
