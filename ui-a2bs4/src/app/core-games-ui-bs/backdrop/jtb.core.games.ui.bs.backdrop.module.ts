import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BootstrapBackdropService} from './bootstrap-backdrop.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        BrowserModule,
        NgbModal
    ],
    providers: [
        BootstrapBackdropService
    ],
})
export class JTBCoreGamesUIBSBackdropModule {
}

