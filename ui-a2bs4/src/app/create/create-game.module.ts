import {NgModule} from '@angular/core';
import {JTBCoreGamesUI} from '../core-games-ui/jtb.core.games.ui.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CreateGameComponent} from './create-game.component';
import {MultiSelectModule} from 'primeng/primeng';
import {JTBCoreGamesUIBootstrap} from '../core-games-ui-bs/jtb.core.games.ui.bs.module';

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
