import {ProdBasicInfo} from "./../dto/entity/ProdBasicInfo";
import {NumberDotFilter} from "./../services/number.dot.filter";
class InterestType {
    name: string;
    totle_interest: string;
    totle_repayment: string;
    every_repayment: string;
}

class ProductInterest {
    totalPayment: number;
    totalInterest: number;
    termPayment: number;

    inputAmount: string;
    inputPeriod: string;

    private interestType: InterestType; //计算公式
    basicInfo: ProdBasicInfo;
    numberDotFilter: NumberDotFilter = null;


    setProductBasicInfo(basicInfo: ProdBasicInfo) {
        this.basicInfo = basicInfo;
        if (basicInfo == null) {
            return;
        }
        if (basicInfo.interestType)
            this.interestType = angular.fromJson(basicInfo.interestType);

        if (basicInfo.minLoanLimit != null && basicInfo.minLoanPeriod != null) {
            this.inputAmount = basicInfo.minLoanLimit;
            this.inputPeriod = basicInfo.minLoanPeriod;
            this.doCalculate();
        }
    }

    doCalculate() {


        console.log("--------金额" + this.inputAmount);
        console.log("--------日期" + this.inputPeriod);

        var icash = this.inputAmount;
        var idate = this.inputPeriod;

        if (icash == null || idate == null) {
            return;
        }
        var shouldCheck=false;
        if (shouldCheck&&this.basicInfo!=null) {
            try {
                var mincash = parseInt(this.basicInfo.minLoanLimit);
                var maxcash = parseInt(this.basicInfo.maxLoanLimit);
                var mindate = parseInt(this.basicInfo.minLoanPeriod);
                var maxdate = parseInt(this.basicInfo.maxLoanPeriod);

                try {
                    var tmpcash = parseInt(icash);
                    if (tmpcash < mincash || tmpcash > maxcash) {
                        this.inputAmount = this.basicInfo.minLoanLimit;
                    }
                } catch (e) {
                    this.inputAmount = this.basicInfo.minLoanLimit;
                }

                try {
                    var tmpdate = parseInt(idate);
                    if (tmpdate < mindate || tmpdate > maxdate) {
                        this.inputPeriod = this.basicInfo.minLoanPeriod;
                    }
                } catch (e) {
                    this.inputPeriod = this.basicInfo.minLoanPeriod;
                }

            } catch (e) {
                console.log("----------------err"+e.message)
                return;
            }
        }


        if (this.interestType.totle_repayment == null
            || this.interestType.totle_interest == null
            || this.interestType.every_repayment == null) {
            return;
        }

        var expressionA = this.generateExpression(this.interestType.totle_repayment, icash + "", idate + "");
        var expressionB = this.generateExpression(this.interestType.totle_interest, icash + "", idate + "");
        var expressionC = this.generateExpression(this.interestType.every_repayment, icash + "", idate + "");


        this.totalPayment = eval(expressionA);
        this.totalInterest = eval(expressionB);
        this.termPayment = eval(expressionC);


        if (this.numberDotFilter == null) {
            this.numberDotFilter = new NumberDotFilter();
        }
        this.totalPayment = this.numberDotFilter.numberDot(this.totalPayment, 2);
        this.totalInterest = this.numberDotFilter.numberDot(this.totalInterest, 2);
        this.termPayment = this.numberDotFilter.numberDot(this.termPayment, 2);

        console.log("-------" + this.totalPayment + "/" + this.totalInterest + "/" + this.termPayment);
    }


    private generateExpression(expression: string, cash: string, cashDate: string): string {
        var resultExpr: string = null;

        const DAYS: string = "days";
        const DATE_RATE: string = "day_rate";
        const LOAN_LIMIT_APPLY: string = "loan_limit_apply";
        const MONTH: string = "months";
        const MONTH_RATE: string = "month_rate";
        //公式中的费率只取一种
        var periodUnit: string = this.basicInfo.periodUnit.toString();
        var isMonth: boolean = "1" === (periodUnit);
        var rate: string = this.basicInfo.monthRate.toString();
        if (!isMonth) {
            rate = this.basicInfo.dayRate.toString();
        }
        rate = (rate == null) ? "0" : rate;

        resultExpr = expression;
        //公式中的费率取多种
        //        resultExpr = resultExpr.replaceAll(DAYS, cashDate).replaceAll(DATE_RATE, basicInfo.getDayRate() == null ? "0" : basicInfo.getDayRate());
        //        resultExpr = resultExpr.replaceAll(MONTH, cashDate).replaceAll(MONTH_RATE, basicInfo.getMonthRate() == null ? "0" : basicInfo.getMonthRate());
        while (resultExpr.indexOf(DAYS) != -1)
            resultExpr = resultExpr.replace(DAYS, cashDate);
        while (resultExpr.indexOf(DATE_RATE) != -1)
            resultExpr = resultExpr.replace(DATE_RATE, rate);
        while (resultExpr.indexOf(MONTH) != -1)
            resultExpr = resultExpr.replace(MONTH, cashDate)
        while (resultExpr.indexOf(MONTH_RATE) != -1)
            resultExpr = resultExpr.replace(MONTH_RATE, rate);
        while (resultExpr.indexOf(LOAN_LIMIT_APPLY) != -1)
            resultExpr = resultExpr.replace(LOAN_LIMIT_APPLY, cash);
        return resultExpr;
    }


}

export {ProductInterest};
