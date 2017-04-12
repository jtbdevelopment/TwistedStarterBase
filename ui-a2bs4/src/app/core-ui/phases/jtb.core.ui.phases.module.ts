import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {JTBCoreUIMessageBus} from '../messagebus/jtb.core.ui.messagebus.module';
import {PhaseCache} from './phasecache.service';

@NgModule({
    imports: [HttpModule, JTBCoreUIMessageBus],
    exports: [JTBCoreUIMessageBus],
    providers: [
        PhaseCache
    ]
})
export class JTBCoreUIPhases {
}
