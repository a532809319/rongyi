import {dto as pbdto} from "./../../entity/ProdBasicInfo";
import {dto as podto} from "./../../entity/ProdOpsInfo";
import {dto as padto} from "./../../entity/ProdPrqXrefDetail";
import {dto as ppdto} from "./../../entity/ProdPrmXrefDetail"

export namespace dto {
    export namespace responseBody {
        export class ProdDtlRespBody {
            basicInfo: pbdto.entity.ProdBasicInfo;
            opsInfo: podto.entity.ProdOpsInfo;
            prqXrefDetail: Array<padto.entity.ProdPrqXrefDetail>;
            prmXrefDetail: Array<ppdto.entity.ProdPrmXrefDetail>;
        }
    }
}

export import ProdDtlRespBody = dto.responseBody.ProdDtlRespBody;