export class HomeFeature {
    static FEATURE_1 = "19";//1、借款大全（全部产品入口）
    static FEATURE_2 = "12";//2、小额极速贷
    static FEATURE_3 = "6";//3、大额贷款
    static FEATURE_4 = "2";//4、公积金借款
    static FEATURE_5 = "09";//5、芝麻信用贷
    static FEATURE_6 = "02";//6、信用卡代还
    static FEATURE_7 = "1";//7、分期购物
    static FEATURE_8 = "18";//8、办理信用卡

    static getFeature(index:number):string{
        var feature=HomeFeature.FEATURE_1;
        if(index==1){
            feature=HomeFeature.FEATURE_1;
        }else if(index==2){
            feature=HomeFeature.FEATURE_2;
        }else if(index==3){
            feature=HomeFeature.FEATURE_3;
        }else if(index==4){
            feature=HomeFeature.FEATURE_4;
        }else if(index==5){
            feature=HomeFeature.FEATURE_5;
        }else if(index==6){
            feature=HomeFeature.FEATURE_6
        }else if(index==7){
            feature=HomeFeature.FEATURE_7;
        }else if(index==8){
            feature=HomeFeature.FEATURE_8;
        }
        return feature;
    }

}
