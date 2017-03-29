export namespace dto{
    export namespace entity{
        export class CurrentVersion{
              platform:string;
              channel:string;
              appName:string;
              currentVersion:string;
              downloadUrl:string;
              forceUpdate:string;
              detectionUpdate:string;
        }
    }
}

export import CurrentVersion = dto.entity.CurrentVersion;
