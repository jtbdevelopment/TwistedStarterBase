import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {PlayerProfileComponent} from './player-profile.component';
import {JTBCoreGamesUI} from 'jtb-core-games-ui';

@NgModule({
    imports: [
        BrowserModule,
        JTBCoreGamesUI
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

