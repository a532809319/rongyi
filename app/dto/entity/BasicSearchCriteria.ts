import {dto as lddto} from "./LoadDuration";
export namespace dto {
    export namespace entity {
        //搜索条件
        export class BasicSearchCriteria {
            
            loanDuration: lddto.entity.LoadDuration;
            
            loanAmount: string;
        }
    }
}
export import BasicSearchCriteria = dto.entity.BasicSearchCriteria;
