
export namespace dto {
    export namespace entity {
        export class ProdOpsInfo {
            usePeopleSize: String;
            successRate: String;
            strategyGuideUrl:string;
        }
    }
}

export import ProdOpsInfo = dto.entity.ProdOpsInfo;
