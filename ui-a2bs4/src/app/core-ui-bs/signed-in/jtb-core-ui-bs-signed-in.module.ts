import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {JTBCoreUI} from '../../core-ui/jtb.core.ui.module';
import {SignedInComponent} from './signed-in.component';

@NgModule({
    imports: [
        BrowserModule,
        NgbModule,
        JTBCoreUI
    ],
    exports: [
        SignedInComponent
    ],
    declarations: [
        SignedInComponent
    ]
})
export class JTBCoreUIBSSignedInModule {
}

