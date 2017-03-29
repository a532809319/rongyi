import {ProdBriefInfo} from "../dto/entity/ProdBriefInfo";
import {SearchEnum} from "./searchEnum";
/**
 * Created by 79078_000 on 2016/11/7.
 */

export class ProductBriefInfoUtil {
    private static changePutMoneyTimeUnit(item: ProdBriefInfo) {
        item["periodUnit"] = (item["periodUnit"] == "0") ? "日" : "月";
        let timeUnit = item["putMoneyTimeUnit"];
        let v = "";
        if (timeUnit === "0") {
            v = "分钟";
        } else if (timeUnit === "1") {
            v = "小时";
        } else {
            v = "日";
        }
        item["putMoneyTimeUnit"] = v;

    }

    private static changeLoanMinute(sortType: string, item: ProdBriefInfo) {

        let timeUnit = item["putMoneyTimeUnit"];
        let putMoneyTime = parseInt(item["putMoneyTime"]);
        let v = 0;
        if (timeUnit === "0" || timeUnit === "分钟") {
            v = putMoneyTime;
        } else if (timeUnit === "1" || timeUnit === "小时") {
            v = putMoneyTime * 60;
        } else {
            v = putMoneyTime * 24 * 60;
        }
        item["loanMinute"] = v;
    }

    //根据periodUnit的值转化为时间单位，0->分钟，1->小时，2->日；同时把最快放款速度转化为 分钟 放入 loanMinute ，便于通过借款速度排序
    static secMinDayAndSort(productList: Array<ProdBriefInfo>, sortType: string = "") {

        if (productList == null) {
            return null;
        }

        // for (let i = 0; i < productList.length; i++) {
        //     productList[i]["periodUnit"] = (productList[i]["periodUnit"] == "0") ? "日" : "月" ;
        //     if (productList[i]["putMoneyTimeUnit"] == "0") {
        //         productList[i]["loanMinute"] = parseInt(productList[i]["putMoneyTime"]);
        //         productList[i]["putMoneyTimeUnit"] = "分钟";
        //
        //     } else if (productList[i]["putMoneyTimeUnit"] == "1") {
        //         productList[i]["loanMinute"] = parseInt(productList[i]["putMoneyTime"]) * 60;
        //         productList[i]["putMoneyTimeUnit"] = "小时";
        //     } else {
        //         productList[i]["loanMinute"] = parseInt(productList[i]["putMoneyTime"]) * 24 * 60;
        //         productList[i]["putMoneyTimeUnit"] = "日";
        //     }
        // }

        for (let i = 0; i < productList.length; i++) {
            ProductBriefInfoUtil.changePutMoneyTimeUnit(productList[i]);
        }

        if (sortType == null || sortType.trim().length == 0) {
            return productList;
        }

        if ("loanMinute" == sortType) {
            for (let i = 0; i < productList.length; i++) {
                ProductBriefInfoUtil.changeLoanMinute(sortType, productList[i]);
            }
        }

        return productList.sort(this.sortProduct(sortType));

    }

    //根据periodUnit的值转化为时间单位，0->分钟，1->小时，2->日；同时把最快放款时间转化为 分钟 放入 loanMinute ，便于通过借款时间排序
    static  secMinDay(productList: Array<ProdBriefInfo>) {
        // for (let i = 0; i < productList.length; i++) {
        //     productList[i]["periodUnit"] = (productList[i]["periodUnit"] == "0") ? "日" : "月";
        //     if (productList[i]["putMoneyTimeUnit"] == "0") {
        //
        //         productList[i]["putMoneyTimeUnit"] = "分钟";
        //
        //     } else if (productList[i]["putMoneyTimeUnit"] == "1") {
        //
        //         productList[i]["putMoneyTimeUnit"] = "小时";
        //     } else {
        //
        //         productList[i]["putMoneyTimeUnit"] = "日";
        //     }
        // }
        // return productList;
        for (let i = 0; i < productList.length; i++) {
            ProductBriefInfoUtil.changePutMoneyTimeUnit(productList[i]);
        }
        return productList;
    }

    //对数组进行排序
    private static  sortProduct(sortType: string) {
        console.log("---sortProduct---" + sortType);
        return function (a, b) {
            let value1 = a[sortType];
            let value2 = b[sortType];

            // return (SearchEnum[sortType] === SearchEnum.loanMinute) ? (value1 - value2) : (value2 - value1);

            if ("loanMinute" === sortType) {
                return (value1 - value2); //升序排列
            } else if ("monthRate" === sortType) {
                return (value1 - value2);//升序排列
            }
            return (value2 - value1);//降序排列
        }
    }


    static testSort(){
        var arr=[1,3,2,4,5,0];
        arr.sort(function(a,b){
            return b-a;
        })
        console.log("--------------降序排列:"+arr);
    }
}
