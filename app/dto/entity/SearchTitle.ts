export namespace dto{
    export namespace entity{
        export class SearchTitle{
            sortName : string = "默认排序";
            moneyName : string = "金额不限";
            typeName : string = "类型不限";
            defultTypeName : string = "类型不限";
            defaultSortName : string = "默认排序";
        }
    }
}

export import SearchTitle = dto.entity.SearchTitle;
