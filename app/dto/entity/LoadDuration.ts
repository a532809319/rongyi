export namespace dto {
    export namespace entity {
        //借款时间和单位
        export class LoadDuration {
            loanPeriod: string;
            periodUnit: string;
        }
    }

}

export import LoadDuration = dto.entity.LoadDuration;
