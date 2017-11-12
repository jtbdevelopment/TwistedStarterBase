import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {JTBCoreGamesUIMessageBus} from '../messagebus/jtb.core.games.ui.messagebus.module';
import {FeatureCacheService} from './feature-cache.service';

@NgModule({
    imports: [HttpModule, JTBCoreGamesUIMessageBus],
    exports: [JTBCoreGamesUIMessageBus],
    providers: [
        FeatureCacheService
    ]
})
export class JTBCoreGamesUIFeatures {
}
