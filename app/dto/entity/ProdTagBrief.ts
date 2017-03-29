
export namespace dto {
    export namespace entity {
        //产品的TAG描述
        export class ProdTagBrief {
            prodTypeId: String;
            prodTypeGroup: String;
            prodTypeName: String;
        }
    }
}

export import ProdTagBrief = dto.entity.ProdTagBrief;