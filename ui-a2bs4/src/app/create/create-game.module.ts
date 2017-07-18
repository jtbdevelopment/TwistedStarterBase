import {NgModule} from '@angular/core';
import {JTBCoreUI} from '../core-ui/jtb.core.ui.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CreateGameComponent} from './create-game.component';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        FormsModule,
        NgbModule,
        JTBCoreUI
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
