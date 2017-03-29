import {dto as nsdto} from "./../../entity/ProdBriefInfo";
export namespace dto {
    export import SelectedProdsRespBody = responseBody.SelectedProdsRespBody;

    export namespace responseBody {
        export class SelectedProdsRespBody {
            selectedProds: Array<nsdto.entity.ProdBriefInfo>;
        }
    }

}
export import SelectedProdsRespBody = dto.responseBody.SelectedProdsRespBody;