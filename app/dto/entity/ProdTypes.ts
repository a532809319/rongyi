export namespace dto {
    export namespace entity {
        export class ProdTypes {
            prodTypeDesc: string;
            prodTypeGroup: string;
            prodTypeId: string;
            prodTypeName: string;
            prodTypeValue: string;
        }

        export class ProdTypeJisuCash {
            prodTypeDesc = "小微极速贷";
            prodTypeGroup = "0";
            prodTypeId = "92";
            prodTypeName = "小微极速贷";
            prodTypeValue = "03";
        }
        export class ProdTypeFenqiLoan {
            prodTypeDesc = "小额分期贷";
            prodTypeGroup = "0";
            prodTypeId = "93";
            prodTypeName = "小额分期贷";
            prodTypeValue = "04";
        }

      /*  {   "productTypes": [{
        "prodTypeId": 100,
        "prodTypeGroup": "0",
        "prodTypeName": "梦想贷",
        "prodTypeValue": "08",
        "prodTypeDesc": "梦想贷"
    },
        {
            "prodTypeId": 101,
            "prodTypeGroup": "0",
            "prodTypeName": "芝麻信用贷",
            "prodTypeValue": "09",
            "prodTypeDesc": "有芝麻信用分就能贷"
        },
        {
            "prodTypeId": 90,
            "prodTypeGroup": "0",
            "prodTypeName": "淘宝贷",
            "prodTypeValue": "01",
            "prodTypeDesc": "需要淘宝账号的借款产品"
        },
        {
            "prodTypeId": 91,
            "prodTypeGroup": "0",
            "prodTypeName": "信用卡代还",
            "prodTypeValue": "02",
            "prodTypeDesc": "信用卡代还产品"
        },
        {
            "prodTypeId": 92,
            "prodTypeGroup": "0",
            "prodTypeName": "小微极速贷",
            "prodTypeValue": "03",
            "prodTypeDesc": "5000元以下借款产品"
        },
        {
            "prodTypeId": 93,
            "prodTypeGroup": "0",
            "prodTypeName": "小额分期贷",
            "prodTypeValue": "04",
            "prodTypeDesc": "分期类借款产品"
        },
        {
            "prodTypeId": 94,
            "prodTypeGroup": "0",
            "prodTypeName": "身份证贷",
            "prodTypeValue": "05",
            "prodTypeDesc": "手机号+身份证即可借款的产品"
        },
        {
            "prodTypeId": 95,
            "prodTypeGroup": "0",
            "prodTypeName": "学生贷",
            "prodTypeValue": "06",
            "prodTypeDesc": "针对学生群体的借款产品"
        },
        {
            "prodTypeId": 98,
            "prodTypeGroup": "0",
            "prodTypeName": "工薪贷",
            "prodTypeValue": "07",
            "prodTypeDesc": "有工作就能贷"
        }]
        }
            */
    }
}

export import ProdTypes = dto.entity.ProdTypes;
export import ProdTypeJisuCash=dto.entity.ProdTypeJisuCash;
