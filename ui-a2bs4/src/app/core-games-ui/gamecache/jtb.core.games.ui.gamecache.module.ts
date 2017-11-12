import {NgModule} from '@angular/core';
import {JTBCoreGamesUIMessageBus} from '../messagebus/jtb.core.games.ui.messagebus.module';
import {HttpModule} from '@angular/http';
import {JTBCoreGamesUIPhases} from '../phases/jtb.core.games.ui.phases.module';
import {GameCacheService} from './game-cache.service';
import {PhaseGameClassifier} from './phase-game-classifier.service';

@NgModule({
    imports: [JTBCoreGamesUIMessageBus, HttpModule, JTBCoreGamesUIPhases],
    exports: [JTBCoreGamesUIMessageBus, JTBCoreGamesUIPhases],
    providers: [
        GameCacheService,
        PhaseGameClassifier
    ]
})
export class JTBCoreGamesUIGameCache {
}
