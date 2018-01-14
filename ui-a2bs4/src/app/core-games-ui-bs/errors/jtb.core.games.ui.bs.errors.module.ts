import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {JTBCoreGamesUI} from '../../core-games-ui/jtb.core.games.ui.module';
import {DefaultErrorComponent} from './default-error.component';
import {BootstrapErrorListenerService} from './bootstrap-error-listener.service';

@NgModule({
    imports: [
        BrowserModule,
        NgbModule,
        JTBCoreGamesUI
    ],
    providers: [
        BootstrapErrorListenerService
    ],
    entryComponents: [
        DefaultErrorComponent
    ],
    declarations: [
        DefaultErrorComponent
    ]
})
export class JTBCoreGamesUIBSErrorsModule {
    // noinspection JSUnusedLocalSymbols
    constructor() {
    }
}

