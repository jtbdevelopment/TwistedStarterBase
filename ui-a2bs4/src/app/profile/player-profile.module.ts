import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {JTBCoreGamesUI} from '../core-games-ui/jtb.core.games.ui.module';
import {PlayerProfileComponent} from './player-profile.component';

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

