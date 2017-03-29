import {NgModule} from '@angular/core';
import {JTBCoreUI} from '../core-ui/jtb.core.ui.module';
import {SignInComponent} from './sign-in/sign-in.component';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {SignedInComponent} from './signed-in/signed-in.component';

@NgModule({
    imports: [JTBCoreUI, BrowserModule, HttpModule],
    exports: [SignInComponent, SignedInComponent],
    declarations: [SignInComponent, SignedInComponent]
})
export class JTBCoreUIBootstrap {
}
