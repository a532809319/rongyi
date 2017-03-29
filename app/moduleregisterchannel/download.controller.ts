import {EasycashServicesName} from "./../services/services.module";
import {NetRequest, NetRequestCallback, NetRequestCode} from "./../services/easycash.network";


class DownLoadController {
   platformCode = 1;

    constructor(private netRequest: NetRequest,
                private $state: angular.ui.IStateService
    ) {
        var thizz = this;

        ionic.Platform.ready(function () {
            var isIPad = ionic.Platform.isIPad();
            var isIOS = ionic.Platform.isIOS();
            var isAndroid = ionic.Platform.isAndroid();
            var isWebView = ionic.Platform.isWebView();

            if (isAndroid) {
                thizz.platformCode = 1;
            }
            if (isIOS || isIPad) {
                thizz.platformCode = 2;
            }if( isWebView){
                alert(1)
            }

             var deviceInformation = ionic.Platform.device();

             var isWebView = ionic.Platform.isWebView();

             var isWindowsPhone = ionic.Platform.isWindowsPhone();

             var currentPlatform = ionic.Platform.platform();
             var currentPlatformVersion = ionic.Platform.version();

             alert("isWebView=" + isWebView
             + "/isIPad=" + isIPad
             + "/isIOS=" + isIOS
             + "/isAndroid=" + isAndroid
             + "/isWindowsPhone=" + isWindowsPhone
             + "/currentPlatform=" + currentPlatform
             + "/currentPlatformVersion=" + currentPlatformVersion);

        });
    }


      godownload(){
        alert("下载啦")
      }


}
DownLoadController.$inject = [EasycashServicesName.NetRequestService, "$state"];
export {DownLoadController};
