import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {JTBCoreUIMessageBus} from '../messagebus/jtb.core.ui.messagebus.module';
import {FeatureCacheService} from './feature-cache.service';

@NgModule({
    imports: [HttpModule, JTBCoreUIMessageBus],
    exports: [JTBCoreUIMessageBus],
    providers: [
        FeatureCacheService
    ]
})
export class JTBCoreUIFeatures {
}
