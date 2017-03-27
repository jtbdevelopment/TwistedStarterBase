import {NgModule} from '@angular/core';
import {JTBCoreUI} from "../core-ui/jtb.core.ui.module";
import {SignInComponent} from "./sign-in/sign-in.component";
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';

@NgModule({
    imports: [JTBCoreUI, BrowserModule, HttpModule],
    exports: [SignInComponent],
    declarations: [SignInComponent]
})
export class JTBCoreUIBootstrap {
}