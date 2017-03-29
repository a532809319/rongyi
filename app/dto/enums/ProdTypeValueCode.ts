/**
 * Created by 79078_000 on 2016/10/28.
 */

export namespace dto {
    export namespace entity {
        export class ProdTypeValueCode {

            static CASHSELECTED: string = "03";//小微极速贷
            static INSTALLMENTLOAN: string = "04";//小额分期贷
            static CREDITCARDREPAY: string = "02"; //信用卡贷还
            //
            static TAOBAOCREDIT: string = "01";   //淘宝贷
            static IDENTITYCREDIT: string = "05"; //身份证贷

            static DREAMCREDIT: string = "08"; //梦想贷
            static ZHIMACREDIT: string = "09"; //芝麻信用贷
            static STUDENTCREDIT:string="06"; //学生贷
            static SALARYCREDIT:string="07"; //工薪贷
        }
    }
}

export import ProdTypeValueCode=dto.entity.ProdTypeValueCode;
