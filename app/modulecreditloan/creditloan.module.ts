import {creditLoanRoute} from "./creditloan.route";
import {EasycashServiceModule} from "../services/services.module";
import {ProductModule} from "../moduleproduct/product.module";
/**
 * Created by 79078_000 on 2016/10/30.
 */


var creditLoanModule = angular.module("creditLoanApp",
    [
        EasycashServiceModule.name,
        ProductModule.name,
        'ionic'
    ]);
creditLoanModule.config(creditLoanRoute);
export {creditLoanModule}
