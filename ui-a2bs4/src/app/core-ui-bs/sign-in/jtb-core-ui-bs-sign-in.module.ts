import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {JTBCoreUI} from '../../core-ui/jtb.core.ui.module';
import {SignInComponent} from './sign-in.component';

@NgModule({
    imports: [
        BrowserModule,
        NgbModule,
        JTBCoreUI
    ],
    exports: [
        SignInComponent
    ],
    declarations: [
        SignInComponent
    ]
})
export class JTBCoreUIBSSignInModule {
}

