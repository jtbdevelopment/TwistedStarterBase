import {NgModule} from '@angular/core';
import {JTBCoreUIMessageBus} from '../messagebus/jtb.core.ui.messagebus.module';
import {GameCache} from './gamecache.service';
import {HttpModule} from '@angular/http';
import {JTBCoreUIPhases} from '../phases/jtb.core.ui.phases.module';
import {PhaseGameClassifier} from './phasegameclassifier.service';

@NgModule({
    imports: [JTBCoreUIMessageBus, HttpModule, JTBCoreUIPhases],
    exports: [JTBCoreUIMessageBus, JTBCoreUIPhases],
    providers: [
        GameCache,
        PhaseGameClassifier
    ]
})
export class JTBCoreUIGameCache {
}
