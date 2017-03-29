
import {dto as basedto} from "./../base/Base";
import {dto as bscdto} from "./body/BasicSearchReqBody";

export namespace dto {
    export namespace request {
        //产品搜索
        export class BasicSearchReq extends basedto.base.BaseReq {
            body: bscdto.requestBody.BasicSearchReqBody;
        }
    }
}

export import BasicSearchReq = dto.request.BasicSearchReq;