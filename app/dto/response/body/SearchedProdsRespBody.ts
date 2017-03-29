
import {dto as pddto} from "./../../entity/ProdBriefInfo";
import {dto as pdtype} from "./../../entity/ProdTypes";
import {dto as pdsech} from "./../../entity/SearchTitle"

export namespace dto {
    export namespace responseBody {
        export class SearchedProdsRespBody {
            public searchedProds: Array<pddto.entity.ProdBriefInfo>;
            public productTypes : Array<pdtype.entity.ProdTypes>;
            public searchTitle : pdsech.entity.SearchTitle;
        }
    }
}

export import SearchedProdsRespBody = dto.responseBody.SearchedProdsRespBody;