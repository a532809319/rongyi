
import {BaseResp} from "./../base/Base";
import {OrderRespBody} from "./body/OrderRespBody";
export namespace dto {
    export namespace response {
        export class OrderResp extends BaseResp {
            body: OrderRespBody;
        }
    }
}

export import OrderResp = dto.response.OrderResp;
