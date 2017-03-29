
import {BaseReq} from "./../base/Base";
import {OrderReqBody} from "./body/OrderReqBody";
export namespace dto {
    export namespace request {
        export class OrderReq extends BaseReq{
           body:  OrderReqBody ;
        }
    }
}

export import OrderReq = dto.request.OrderReq;
