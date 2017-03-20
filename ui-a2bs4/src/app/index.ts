import {NgModule, OpaqueToken} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routing, RootComponent} from './routes';
import {MainComponent} from './main';
import {FooterComponent} from './navbar/footer';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppConfig} from './AppConfig';

export let APP_CONFIG = new OpaqueToken('app.config');

@NgModule({
    imports: [
        BrowserModule,
        routing,
        NgbModule.forRoot()
    ],
    declarations: [
        RootComponent,
        MainComponent,
        FooterComponent
    ],
    bootstrap: [RootComponent],
    providers: [AppConfig]
})
export class AppModule {
}
