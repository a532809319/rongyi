import {CurrentVersion}  from "./../../entity/CurrentVersion";
import {BannerInfo}  from "./../../entity/BannerInfo";
export namespace dto {
    export namespace responseBody {

        export class AppStartUpInfoRespBody {
              currentVersion:CurrentVersion ;
              bannerInfos: Array<BannerInfo>;
        }
    }
}

export import AppStartUpInfoRespBody = dto.responseBody.AppStartUpInfoRespBody;
