import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {JTBCoreGamesUIMessageBus} from '../messagebus/jtb.core.games.ui.messagebus.module';
import {PhaseCacheService} from './phase-cache.service';

@NgModule({
    imports: [HttpModule, JTBCoreGamesUIMessageBus],
    exports: [JTBCoreGamesUIMessageBus],
    providers: [
        PhaseCacheService
    ]
})
export class JTBCoreGamesUIPhases {
}
