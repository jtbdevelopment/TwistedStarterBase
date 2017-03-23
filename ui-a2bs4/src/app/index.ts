import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routing, RootComponent} from './routes';
import {MainComponent} from './main';
import {AppConfig} from './appconfig';
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
    providers: [AppConfig]
})
export class AppModule {
}
