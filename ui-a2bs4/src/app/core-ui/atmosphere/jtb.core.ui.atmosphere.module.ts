import {NgModule} from '@angular/core';
import {JTBCoreUIMessageBus} from '../messagebus/jtb.core.ui.messagebus.module';
import {AtmosphereService} from './atmosphere.service';
import {AtmosphereMessageProcessorService} from './atmospheremessageprocessor.service';

@NgModule({
    imports: [JTBCoreUIMessageBus],
    exports: [JTBCoreUIMessageBus],
    providers: [
        AtmosphereService,
        AtmosphereMessageProcessorService
    ]
})
export class JTBCoreUIAtmosphere {
}
