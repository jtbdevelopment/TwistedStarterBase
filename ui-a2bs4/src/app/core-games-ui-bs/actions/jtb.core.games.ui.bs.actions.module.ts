import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {JTBCoreGamesUI} from '../../core-games-ui/jtb.core.games.ui.module';
import {FormsModule} from '@angular/forms';
import {BootstrapActionsService} from './bootstrap-actions.service';
import {DefaultActionConfirmComponent} from './default-action-confirm.component';
import {DefaultActionErrorComponent} from './default-action-error.component';
import {HttpModule} from '@angular/http';
import {JTBCoreGamesUIBSAdsModule} from '../ads/jtb.core.games.ui.bs.ads.module';

@NgModule({
    imports: [
        HttpModule,
        BrowserModule,
        NgbModule,
        FormsModule,
        JTBCoreGamesUI,
        JTBCoreGamesUIBSAdsModule
    ],
    providers: [
        BootstrapActionsService
    ],
    entryComponents: [
        DefaultActionConfirmComponent,
        DefaultActionErrorComponent
    ],
    declarations: [
        DefaultActionConfirmComponent,
        DefaultActionErrorComponent
    ]
})
export class JTBCoreGamesUIBSActionsModule {
}
