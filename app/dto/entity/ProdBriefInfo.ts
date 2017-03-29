import {dto as nsdto} from "./ProdTagBrief";
export namespace dto {
    export namespace entity {
        //产品简介信息
        export class ProdBriefInfo {
            
            productId: string;
            productName: string;
            logoUrl: string;
            prodDesc: string;
            prodTagBriefs: Array<nsdto.entity.ProdTagBrief>;
            successRate: string;
            yield: string;
            monthRate: string;
            dayRate: string; //日费率
            prodCatg: string;//区分 日费率 和月费率
            periodUnit: string; //区分最快放款时间： 0->分钟  1->小时  2->日
            maxLoanLimit: string;
            minLoanLimit: string;
            maxLoanPeriod: string;
            minLoanPeriod: string;
            loanMinute: number; //把最快借款时间转化为 分钟，用以排序

            getProdCatg(){
                return "1"===this.prodCatg;
            }
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

export import ProdBriefInfo=dto.entity.ProdBriefInfo;
