import {dto as basedto  } from "./../base/Base";
import {dto as bodydto} from "./body/SearchedProdsRespBody";
export namespace dto {
    export namespace response {
        export class SearchedProdsResp extends basedto.base.BaseResp {
            body: bodydto.responseBody.SearchedProdsRespBody;
        }
    }
}
export import SearchedProdsResp = dto.response.SearchedProdsResp;
