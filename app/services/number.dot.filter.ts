/**
 * Created by 79078_000 on 2016/9/14.
 */
//数字保留几位数字的过滤器
class NumberDotFilter {
    //src : string or number 要处理的数字或数字字符串,fraction 保留的位数
    numberDot(src: any, fraction: number) {
        var tmpsrc: number = null;
        if (typeof(src) === 'string') {
            try {
                tmpsrc = parseFloat(src);
            } catch (e) {
                tmpsrc = null;
            }
        }
        if (typeof(src) === 'number') {
            tmpsrc = src;
        }
        if (tmpsrc != null) {
            return tmpsrc.toFixed(fraction);
        }
        return src;
    }

    getProductFee(src: any) {
        var tmpsrc: number = null;
        if (typeof(src) === 'string') {
            try {
                tmpsrc = parseFloat(src);
            } catch (e) {
                tmpsrc = null;
            }
        }
        if (typeof(src) === 'number') {
            tmpsrc = src;
        }
        if (tmpsrc != null) {
            return (tmpsrc * 100 ).toFixed(2) + "%";
        }
        return src;
    }

}

export {NumberDotFilter};
