import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {JTBCoreUIMessageBus} from '../messagebus/jtb.core.ui.messagebus.module';
import {PhaseCacheService} from './phase-cache.service';

@NgModule({
    imports: [HttpModule, JTBCoreUIMessageBus],
    exports: [JTBCoreUIMessageBus],
    providers: [
        PhaseCacheService
    ]
})
export class JTBCoreUIPhases {
}
