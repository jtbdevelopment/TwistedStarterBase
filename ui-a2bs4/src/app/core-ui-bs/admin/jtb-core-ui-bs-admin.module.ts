import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AdminComponent} from './admin.component';
import {AdminStatsComponent} from './admin-stats.component';
import {JTBCoreUI} from '../../core-ui/jtb.core.ui.module';
import {AdminSwitchPlayerComponent} from './admin-switch-player.component';

@NgModule({
    imports: [
        BrowserModule,
        NgbModule,
        JTBCoreUI
    ],
    exports: [
        AdminComponent
    ],
    declarations: [
        AdminComponent,
        AdminStatsComponent,
        AdminSwitchPlayerComponent
    ]
})
export class JTBCoreUIBSAdminModule {
}

