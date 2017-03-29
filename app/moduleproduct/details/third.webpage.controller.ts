/**
 * Created by 79078_000 on 2016/9/29.
 */
import {IntentParamModel, DATA} from "./../../models/intent.parammodel";
import {IntentThirdWebpage} from "../../models/intent.thirdwebpage";
class ThirdWebpageController {
    thirdPlatformUrl:any=null;
    constructor(
        private $stateParams:angular.ui.IStateParamsService,
        private $sce:angular.ISCEService
    ){
        if(this.$stateParams){
            var p:IntentThirdWebpage=this.$stateParams[DATA];
            if(p!=null&&p.url!=null){

                var obj= this.$sce.trustAsResourceUrl(p.url);
                this.thirdPlatformUrl=obj;//p.url;
                console.log("加载第三方平台Url="+p.url +","+angular.toJson(obj));

            }

        }
    }

    $onInit(){

    }
    $onDestroy(){
       alert("-----------我被销毁了");
       console.log("$onDestroy销毁");
    }
}
ThirdWebpageController.$inject=["$stateParams","$sce"];
export {ThirdWebpageController};
