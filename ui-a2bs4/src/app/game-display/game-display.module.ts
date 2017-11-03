import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {JTBCoreUIBootstrap} from '../core-ui-bs/jtb.core.ui.bs.module';
import {PlayersAndStatesComponent} from './players-and-states.component';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        NgbModule,
        JTBCoreUIBootstrap
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

