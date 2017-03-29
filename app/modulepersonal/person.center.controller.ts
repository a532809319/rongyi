import {Constants} from "../models/constants";
import {JsonNativeSender} from "../nativepage/impl/json.native.sender";
import {JsonCmdId} from "../nativepage/impl/json.cmdid";
import {ItemPlatform} from "../models/item.platform";
import {PersonalDoc} from "../models/personal.doc";
/**
 * Created by 79078_000 on 2016/9/18.
 */

class PersonCenterController {
    public itemPlatform: ItemPlatform = new ItemPlatform();
    personDoc: PersonalDoc = null;

    constructor() {

    }


    forwardPersonalDoc() {
        if (Constants.IS_NATIVE) {
            this.withNativeForwardPersonalDoc();
        } else {
            this.withJsForwardPersonalDoc();
        }
    }

    private withJsForwardPersonalDoc() {

    }

    private withNativeForwardPersonalDoc() {
        JsonNativeSender.callNative(JsonCmdId.ID_600_doc, null);
    }


    forwardPersonalLoan() {
        if (Constants.IS_NATIVE) {
            this.withNativeForwardPersonalLoan();
        } else {
            this.withJsForwardPersonalLoan();
        }
    }

    private withJsForwardPersonalLoan() {

    }

    private withNativeForwardPersonalLoan() {
        JsonNativeSender.callNative(JsonCmdId.ID_601_loan, null);
    }

    forwardCommonQuestion() {
        if (Constants.IS_NATIVE) {
            this.withNativeForwardCommonQuestion();
        } else {
            this.withJsForwardCommonQuestion();
        }
    }

    private withJsForwardCommonQuestion() {

    }

    private withNativeForwardCommonQuestion() {
        JsonNativeSender.callNative(JsonCmdId.ID_602_question, null);
    }

    forwardLinkCEO() {
        if (Constants.IS_NATIVE) {
            this.withNativeForwardLinkCEO();
        } else {
            this.withJsForwardLinkCEO();
        }
    }

    private withJsForwardLinkCEO() {

    }

    private withNativeForwardLinkCEO() {
        JsonNativeSender.callNative(JsonCmdId.ID_603_link, null);
    }

    forwardSettings() {
        if (Constants.IS_NATIVE) {
            this.withNativeForwardSettings();
        } else {
            this.withJsForwardSettings();
        }
    }

    private withJsForwardSettings() {

    }

    private withNativeForwardSettings() {
        JsonNativeSender.callNative(JsonCmdId.ID_604_settings, null);
    }

    setPersonalDoc(personalDocJson: string) {
        var doc = angular.fromJson(personalDocJson);
        this.personDoc = doc;
    }
}

export {PersonCenterController}
