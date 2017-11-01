import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {JTBCoreUI} from '../../core-ui/jtb.core.ui.module';
import {FormsModule} from '@angular/forms';
import {BootstrapActionsService} from './bootstrap-actions.service';
import {DefaultActionConfirmComponent} from './default-action-confirm.component';
import {DefaultActionErrorComponent} from './default-action-error.component';
import {HttpModule} from '@angular/http';

@NgModule({
    imports: [
        HttpModule,
        BrowserModule,
        NgbModule,
        FormsModule,
        JTBCoreUI
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
export class JTBCoreUIBSActionsModule {
}
