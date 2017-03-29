import {JsonParamBase} from "./json.param.base";
/**
 * Created by 79078_000 on 2016/10/13.
 */

const NATIVE_SENDER = "RYNativeCallee";
export class JsonNativeSender {
    static callNative(cmdId: number, jsonParams: JsonParamBase) {
        var sender = window[NATIVE_SENDER];
        if (sender) {
            sender.callNative(cmdId, angular.toJson(jsonParams));
        }
    }
}
