/**
 * Created by 79078_000 on 2016/9/18.
 */
import {HomeSearchRoute} from "./home.search.route";
import {EasycashServiceModule} from "../../services/services.module";
import {ProductModule} from "../../moduleproduct/product.module";

var HomeSearchModule = angular.module("homeSearchApp",
    [
        EasycashServiceModule.name,
        ProductModule.name,
        "ionic"
    ]);

HomeSearchModule.config(HomeSearchRoute);

export {HomeSearchModule};
