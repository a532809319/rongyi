import {dto as nsdto} from "./../base/Base";
import {dto as nsbody} from "./body/SelectedProdsRespBody";
import {dto as recbody} from "./body/RecommendedProdsRespBody";
import {dto as detailBody} from "./body/ProdDtlRespBody";

export namespace dto {
    export namespace response {
        export class SelectedProdsResp extends nsdto.base.BaseResp {
            body: nsbody.responseBody.SelectedProdsRespBody;
        }

        export class RecommendedProdsResp extends nsdto.base.BaseResp {
            body: recbody.responseBody.RecommendedProdsRespBody;
        }

        export class ProdDtlResp extends nsdto.base.BaseResp {
            body: detailBody.responseBody.ProdDtlRespBody;
        }
    }
}

export import SelectedProdsResp = dto.response.SelectedProdsResp;
export import RecommendedProdsResp = dto.response.RecommendedProdsResp;
export import ProdDtlResp = dto.response.ProdDtlResp;
