export namespace dto {
    export namespace entity {
        //产品基本信息
        export class ProdBasicInfo {
            productId: string;
            prodName: string;
            logoUrl: string;
            prodDesc: string;
            productVendorId: string;
            maxLoanLimit: string;
            minLoanLimit: string;
            maxLoanPeriod: string;
            minLoanPeriod: string;
            periodUnit: string;
            yield: string;
            feeRate: string;
            monthRate: string;
            dayRate: string;
            putMoneyTime: string;
            putMoneyTimeUnit: string;
            repayManner: string;
            // applyCriteria: Array<string>;
            // applyMaterial: Array<string>;
            advanceRepayDesc: string;
            productUrl: string;
            interestType: string;

            prodCatg: string;

            //新增字段
            prodNameEn: string;
            applyActionType: string;
            avgLoanAmount:string;
            guide: string;


            isMonthRateCategory(): boolean {
                if (this.prodCatg == null) {
                    return true;
                }
                if ("1" === (this.prodCatg)) {
                    return true;
                }
                return false;
            }

        }
    }
}

export import ProdBasicInfo = dto.entity.ProdBasicInfo;
