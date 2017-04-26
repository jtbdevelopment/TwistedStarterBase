import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {JTBCoreUI} from '../core-ui/jtb.core.ui.module';
import {PlayerProfileComponent} from './player-profile.component';

@NgModule({
    imports: [
        BrowserModule,
        JTBCoreUI
    ],
    exports: [
        PlayerProfileComponent
    ],
    declarations: [
        PlayerProfileComponent
    ]
})
export class PlayerProfileModule {
}

