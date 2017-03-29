
export namespace dto {
    export namespace entity {
        //借款时间和单位
        export class Order {
            id:string;
            userId:string;
            name:string;
            productId:string;
            productName:string;
            monthRate:string;
            transDate:string;
            transTime:string;
            loanLimitApply:string;
            loanAmountPaidIn:string;
            loanPeriod:string;
            stat:string;
            periodUnit:string;
            logoUrl:string;
            productUrl:string;
            tele:string;
        }
    }

}

export import Order = dto.entity.Order;
