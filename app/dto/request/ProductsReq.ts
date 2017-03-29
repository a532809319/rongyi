import {dto as nsdto} from "./../base/Base";
export namespace dto {
    export namespace request {
        //(非)精选产品
        export class SelectedProdsReq extends nsdto.base.BaseReq {

        }
        //推荐产品
        export class RecommendedProdsReq extends nsdto.base.BaseReq {

        }
        //产品详情
        export class ProductInfoIReq extends nsdto.base.BaseReq {

        }
    }
}

export import SelectedProdsReq = dto.request.SelectedProdsReq;
export import RecommendedProdsReq = dto.request.RecommendedProdsReq;
export import ProductInfoIReq = dto.request.ProductInfoIReq;