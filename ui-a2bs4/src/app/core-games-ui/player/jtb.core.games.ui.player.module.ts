import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {JTBCoreGamesUIMessageBus} from '../messagebus/jtb.core.games.ui.messagebus.module';
import {PlayerService} from './player.service';

@NgModule({
    imports: [HttpModule, JTBCoreGamesUIMessageBus],
    exports: [JTBCoreGamesUIMessageBus],
    providers: [
        PlayerService
    ]
})
export class JTBCoreGamesUIPlayer {
}
