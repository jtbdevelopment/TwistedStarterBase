import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {JTBCoreGamesUI} from '../../core-games-ui/jtb.core.games.ui.module';
import {SignedInComponent} from './signed-in.component';

@NgModule({
    imports: [
        BrowserModule,
        NgbModule,
        JTBCoreGamesUI
    ],
    exports: [
        SignedInComponent
    ],
    declarations: [
        SignedInComponent
    ]
})
export class JTBCoreGamesUIBSSignedInModule {
}

