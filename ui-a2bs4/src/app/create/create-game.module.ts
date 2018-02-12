import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CreateGameComponent} from './create-game.component';
import {MultiSelectModule} from 'primeng/primeng';
import {JTBCoreGamesUI} from 'jtb-core-games-ui';
import {JTBCoreGamesUIBootstrap} from 'jtb-core-games-bootstrap-ui';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        FormsModule,
        NgbModule,
        MultiSelectModule,
        JTBCoreGamesUIBootstrap,
        JTBCoreGamesUI
    ],
    exports: [
        CreateGameComponent
    ],
    declarations: [
        CreateGameComponent
    ]
})
export class CreateGameModule {
}
