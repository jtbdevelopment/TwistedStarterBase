import {NgModule} from '@angular/core';
import {JTBCoreUIMessageBus} from '../messagebus/jtb.core.ui.messagebus.module';
import {HttpModule} from '@angular/http';
import {JTBCoreUIPhases} from '../phases/jtb.core.ui.phases.module';
import {GameCacheService} from './game-cache.service';
import {PhaseGameClassifier} from './phase-game-classifier.service';

@NgModule({
    imports: [JTBCoreUIMessageBus, HttpModule, JTBCoreUIPhases],
    exports: [JTBCoreUIMessageBus, JTBCoreUIPhases],
    providers: [
        GameCacheService,
        PhaseGameClassifier
    ]
})
export class JTBCoreUIGameCache {
}
