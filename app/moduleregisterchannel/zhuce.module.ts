import { RouterNameService } from './../services/routename.service';

import {EasycashServiceModule} from "../services/services.module";
import {ZhuceRoute} from "./zhuce.route";
var ZhuceModule=angular.module(RouterNameService.registerChannelPage,
    [ "ionic",
        EasycashServiceModule.name,

    ])    ;  
ZhuceModule.config(ZhuceRoute); 

export {ZhuceModule};


