import {NgModule} from '@angular/core';
import {PlayerService} from './player/player.service';
import {HttpModule} from '@angular/http';
import {MessageBusService} from './messagebus/messagebus.service';
import {AtmosphereService} from './livefeed/atmosphere.service';
import {AtmosphereMessageProcessorService} from './livefeed/atmospheremessageprocessor.service';

@NgModule({
    imports: [HttpModule],
    providers: [PlayerService, MessageBusService, AtmosphereService, AtmosphereMessageProcessorService]
})
export class JTBCoreUI {
}
