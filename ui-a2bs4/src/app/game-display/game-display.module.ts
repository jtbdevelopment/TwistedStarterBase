import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {PlayersAndStatesComponent} from './players-and-states.component';
import {JTBCoreGamesUIBootstrap} from 'jtb-core-games-bootstrap-ui';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        NgbModule,
        JTBCoreGamesUIBootstrap
    ],
    exports: [
        PlayersAndStatesComponent
    ],
    providers: [],
    declarations: [
        PlayersAndStatesComponent
    ]
})
export class GameDisplayModule {
}

