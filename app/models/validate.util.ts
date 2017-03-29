/**
 * Created by 79078_000 on 2016/9/19.
 */

class ValidateUtil {
    static OK_CHECK: string = "OK_CHECK";

    static checkInputAmount(inputAmount: string): string {
        if (inputAmount == null || inputAmount.trim().length == 0) {
            return "请输入金额";
        }
        return ValidateUtil.OK_CHECK;
    }

    static checkInputPeriod(inputPeriod: string): string {
        if (inputPeriod == null || inputPeriod.trim().length == 0) {
            return "请输入期限";
        }
        return ValidateUtil.OK_CHECK;
    }

    static checkMobile(inputMobile: string): string {
        if (inputMobile == null || inputMobile.length != 11) {
            return "手机号不正确";
        }
        return ValidateUtil.OK_CHECK;
    }

    static checkPwd(firstPwd: string, secondPwd: string): string {
        if (firstPwd == null || secondPwd == null) {
            return "密码不正确";
        }
        if (firstPwd != secondPwd) {
            return "两次密码不匹配";
        }
        return ValidateUtil.OK_CHECK;
    }

    static checkSmsCode(firstSmsCode: string, secondSmsCode: string): string {
        if (firstSmsCode == null || secondSmsCode == null) {
            return "验证码不正确";
        }
        if (secondSmsCode != firstSmsCode) {
            return "验证码不正确";
        }
        return ValidateUtil.OK_CHECK;
    }
}

export {ValidateUtil}
