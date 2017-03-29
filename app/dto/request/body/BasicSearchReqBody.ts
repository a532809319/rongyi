import {dto as bscdto} from "./../../entity/BasicSearch";

export namespace dto {
    export namespace requestBody {
        export class BasicSearchReqBody extends bscdto.entity.BasicSearch {

        }
    }
}

export import BasicSearchReqBody = dto.requestBody.BasicSearchReqBody;
