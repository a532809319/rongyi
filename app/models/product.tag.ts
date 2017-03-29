import {ProdTypeValueCode} from "../dto/enums/ProdTypeValueCode";
/**
 * Created by 79078_000 on 2016/10/28.
 */

export class ProductTag {
    tagType: string;
    tagName: string;
    tagIcon: string;

    constructor(tagType: string, tagName: string, tagIcon: string) {
        this.tagType = tagType;
        this.tagName = tagName;
        this.tagIcon = tagIcon;
    }
}
