import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {JTBCoreUIMessageBus} from '../messagebus/jtb.core.ui.messagebus.module';
import {PlayerService} from './player.service';

@NgModule({
    imports: [HttpModule, JTBCoreUIMessageBus],
    exports: [JTBCoreUIMessageBus],
    providers: [
        PlayerService
    ]
})
export class JTBCoreUIPlayer {
}
