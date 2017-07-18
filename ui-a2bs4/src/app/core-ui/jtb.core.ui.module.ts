import {NgModule} from '@angular/core';
import {JTBCoreUIMessageBus} from './messagebus/jtb.core.ui.messagebus.module';
import {JTBCoreUIAtmosphere} from './atmosphere/jtb.core.ui.atmosphere.module';
import {JTBCoreUIGameCache} from './gamecache/jtb.core.ui.gamecache.module';
import {JTBCoreUIPhases} from './phases/jtb.core.ui.phases.module';
import {JTBCoreUIPlayer} from './player/jtb.core.ui.player.module';
import {JTBCoreUIUtils} from './utils/jtb.core.ui.utils.module';
import {JTBCoreUIFeatures} from './features/jtb.core.ui.features.module';

//  Use of this module presumes:
//  1.  You will implement GameFactory and provide as 'GameFactory'
//  2.  You will create (or re-use PhaseGameClassifier) an GameClassifier and provide as 'GameClassifier'
@NgModule({
    imports: [
        JTBCoreUIAtmosphere,
        JTBCoreUIMessageBus,
        JTBCoreUIGameCache,
        JTBCoreUIFeatures,
        JTBCoreUIPhases,
        JTBCoreUIPlayer,
        JTBCoreUIUtils
    ],
    exports: [
        JTBCoreUIAtmosphere,
        JTBCoreUIMessageBus,
        JTBCoreUIGameCache,
        JTBCoreUIFeatures,
        JTBCoreUIPhases,
        JTBCoreUIPlayer,
        JTBCoreUIUtils
    ]
})
export class JTBCoreUI {
}
