import {NgModule} from '@angular/core';
import {JTBCoreGamesUIBSAdminModule} from './admin/jtb.core.games.ui.bs.admin.module';
import {JTBCoreGamesUIBSSignInModule} from './sign-in/jtb.core.games.ui.bs.sign-in.module';
import {JTBCoreGamesUIBSActionsModule} from './actions/jtb.core.games.ui.bs.actions.module';
import {JTBCoreGamesUIBSSignedInModule} from './signed-in/jtb.core.games.ui.bs.signed-in.module';

@NgModule({
    imports: [JTBCoreGamesUIBSAdminModule, JTBCoreGamesUIBSSignInModule, JTBCoreGamesUIBSSignedInModule, JTBCoreGamesUIBSActionsModule],
    exports: [JTBCoreGamesUIBSAdminModule, JTBCoreGamesUIBSSignInModule, JTBCoreGamesUIBSSignedInModule, JTBCoreGamesUIBSActionsModule]
})
export class JTBCoreGamesUIBootstrap {
}
