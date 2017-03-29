
import {dto as nsdto} from "./../../entity/ProdBriefInfo";
export namespace dto {
    export namespace responseBody {
        export class RecommendedProdsRespBody {
            recommendedProds: Array<nsdto.entity.ProdBriefInfo>;
        }
    }
}

export import RecommendedProdsRespBody = dto.responseBody.RecommendedProdsRespBody;