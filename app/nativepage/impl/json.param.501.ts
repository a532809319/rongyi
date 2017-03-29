import {JsonParamBase} from "./json.param.base";
import {ProdDtlRespBody} from "../../dto/response/body/ProdDtlRespBody";
/**
 * Created by 79078_000 on 2016/10/13.
 */

export class JsonParam501 extends JsonParamBase {
    amount: string;
    period: string;
    unit: string;

    body:ProdDtlRespBody;

}
