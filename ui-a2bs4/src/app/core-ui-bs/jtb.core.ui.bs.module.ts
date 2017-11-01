import {NgModule} from '@angular/core';
import {JTBCoreUIBSAdminModule} from './admin/jtb-core-ui-bs-admin.module';
import {JTBCoreUIBSSignInModule} from './sign-in/jtb-core-ui-bs-sign-in.module';
import {JTBCoreUIBSSignedInModule} from './signed-in/jtb-core-ui-bs-signed-in.module';
import {JTBCoreUIBSActionsModule} from './actions/jtb.core.ui.bs-actions.module';

@NgModule({
    imports: [JTBCoreUIBSAdminModule, JTBCoreUIBSSignInModule, JTBCoreUIBSSignedInModule, JTBCoreUIBSActionsModule],
    exports: [JTBCoreUIBSAdminModule, JTBCoreUIBSSignInModule, JTBCoreUIBSSignedInModule, JTBCoreUIBSActionsModule]
})
export class JTBCoreUIBootstrap {
}
