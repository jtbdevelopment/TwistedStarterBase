import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routing, RootComponent} from './routes';
import {MainComponent} from './main';
import {NavBarComponent} from './navbar/navbar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppConfig} from './appconfig';
import {JTBCoreUI} from './core-ui/jtb.core.ui';

@NgModule({
    imports: [
        BrowserModule,
        routing,
        NgbModule.forRoot(),
        JTBCoreUI
    ],
    declarations: [
        RootComponent,
        MainComponent,
        NavBarComponent
    ],
    bootstrap: [RootComponent],
    providers: [AppConfig]
})
export class AppModule {
}
