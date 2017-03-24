import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routing, RootComponent} from './routes';
import {MainComponent} from './main';
import {TwistedAppConfig} from './app.config';
import {NavigationBarModule} from './navbar/navigation-bar.module';

@NgModule({
    imports: [
        BrowserModule,
        routing,
        NavigationBarModule,
    ],
    declarations: [
        RootComponent,
        MainComponent
    ],
    bootstrap: [RootComponent],
    providers: [{provide: 'AppConfig', useClass: TwistedAppConfig}]
})
export class AppModule {
}
