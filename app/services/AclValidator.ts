export class AclValidator {
  constructor() {

  }

  static checkMobileNumber(str: string): boolean {
    if (str == null || str.length != 11) {
      return false;
    }
    var re = /^1\d{10}$/;
    var ok = re.test(str);
    return ok;
  }

  static  checkRegisterPwd(str: string) {
    if (str == null) {
      return false;
    }
    if (str.length >= 6 && str.length <= 20) {
      return true;
    }
    return false;
  }

  static  checkResetPwd(str: string) {
    return AclValidator.checkRegisterPwd(str);
  }

  static  checkTransactionPwd(str: string): boolean {
    if (str == null || str.length != 6) {
      return false;
    }
    var exp1 = /\d{6}/;
    var ok = exp1.test(str);
    return ok;
  }

  static  checkVerifyCode(str: string) {
    if (str == null || str.length == 0) {
      return false;
    }
    return true;
  }
}
