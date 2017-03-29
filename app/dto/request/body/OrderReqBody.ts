
import {Order} from "./../../entity/Order";

export namespace dto {
    export namespace requestBody {
        export class OrderReqBody extends Order {
          
        }
    }
}

export import OrderReqBody = dto.requestBody.OrderReqBody;

