export namespace dto{
    export namespace entity{
        export class BannerInfo{
            bannerDesc:string;
            bannerPicUrl:string;
            bannerPicHref:string;
            priority:string;

        }
    }
}

export import BannerInfo = dto.entity.BannerInfo;
