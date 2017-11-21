import {NgModule} from '@angular/core';
import {JTBCoreGamesUIBSAdminModule} from './admin/jtb.core.games.ui.bs.admin.module';
import {JTBCoreGamesUIBSSignInModule} from './sign-in/jtb.core.games.ui.bs.sign-in.module';
import {JTBCoreGamesUIBSActionsModule} from './actions/jtb.core.games.ui.bs.actions.module';
import {JTBCoreGamesUIBSSignedInModule} from './signed-in/jtb.core.games.ui.bs.signed-in.module';
import {JTBCoreGamesUIBSVersionNotesModule} from './version-notes/jtb.core.games.ui.bs.version-notes.module';

@NgModule({
    imports: [
        JTBCoreGamesUIBSAdminModule,
        JTBCoreGamesUIBSSignInModule,
        JTBCoreGamesUIBSSignedInModule,
        JTBCoreGamesUIBSActionsModule,
        JTBCoreGamesUIBSVersionNotesModule
    ],
    exports: [
        JTBCoreGamesUIBSAdminModule,
        JTBCoreGamesUIBSSignInModule,
        JTBCoreGamesUIBSSignedInModule,
        JTBCoreGamesUIBSActionsModule,
        JTBCoreGamesUIBSVersionNotesModule
    ]
})
export class JTBCoreGamesUIBootstrap {
}
