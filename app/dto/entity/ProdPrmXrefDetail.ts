export namespace dto{
    export namespace entity{
        export class ProdPrmXrefDetail{
            productId: string;
            applyMaterialId: string;
            applyMaterialName: string;
            applyMaterialDesc: string;
        }
    }
}

export import  ProdPrmXrefDetail = dto.entity.ProdPrmXrefDetail;