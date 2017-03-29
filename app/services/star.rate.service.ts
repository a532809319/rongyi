/**
 * Created by 79078_000 on 2016/9/18.
 */

export class StarRateService {

    //star数目,最大为5
    static getStarRate(rate: string): number {

        if (rate == null || angular.isUndefined(rate) || rate.length == 0) {
            return 0;
        }
        try {
            var irate = parseFloat(rate);
            return (irate * 0.20) * 100;
        } catch (e) {

        }
        return 0;
    }
}
