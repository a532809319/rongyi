//详情页面申请条件/材料
export namespace dto{
    export namespace entity{
        export class ProdPrqXrefDetail{
            productid: string;
            applyReqId: string;
            applyReqName: string;
            applyReqDesc: string
        }
    }
}

export import ProdPrqXrefDetail = dto.entity.ProdPrqXrefDetail;