/**
 * Created by 79078_000 on 2016/10/10.
 */

export class RouterNativeName {
    static loginPage = "loginPage";
    static registerPage="registerPage";
    static personCenterPage="personCenterPage";
    static productListPage="productListPage";
    static productSearchPage="productSearchPage";
    static productDetailPage="productDetailPage";
    static productRecommandPage="productRecommandPage";
    static productTagPage="productTagPage";
    static productLowerAmountPage="productLowerAmountPage";

    static  newRouterUrl(routername: string):string {
        return "/" + routername;
    }
}
