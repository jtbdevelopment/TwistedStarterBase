import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {JTBCoreGamesUI} from '../../core-games-ui/jtb.core.games.ui.module';
import {SignInComponent} from './sign-in.component';

@NgModule({
    imports: [
        BrowserModule,
        NgbModule,
        JTBCoreGamesUI
    ],
    providers: [
        {provide: 'Window', useValue: window}
    ],
    exports: [
        SignInComponent
    ],
    declarations: [
        SignInComponent
    ]
})
export class JTBCoreGamesUIBSSignInModule {
}

