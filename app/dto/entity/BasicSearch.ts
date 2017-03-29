export namespace dto{
    export namespace entity{
        export class BasicSearch{
            minLoanAmount: string;
            maxLoanAmount: string;
            prodTypeId: string;
        }
    }
}

export import BasicSearch = dto.entity.BasicSearch;