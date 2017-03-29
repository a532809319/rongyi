/**
 * Created by 79078_000 on 2017/1/8.
 */

export class AclToast {
  public static TOAST_LONG: number = 3000;//显示一条消息3s之后自动取消
  public static TOAST_SHORT: number = 1000;//显示一条消息1s之后自动取消

  public static toast(toastMessage: string, millisSeconds: number, $ionicLoading: ionic.loading.IonicLoadingService): void {
    var options: ionic.loading.IonicLoadingOptions = {
      template: toastMessage,
      noBackdrop: true,
      hideOnStateChange: true,
      duration: millisSeconds
    };
    $ionicLoading.show(options);
  }
}
