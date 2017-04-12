import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routing} from './routes';
import {MainComponent} from './main';
import {TwistedAppConfig} from './app.config';
import {NavigationBarModule} from './navbar/navigation-bar.module';
import {JTBCoreUIBootstrap} from './core-ui-bs/jtb.core.ui.bs.module';
import {RootComponent} from './root.component';
import {TSBGameFactory} from './game/tsbgamefactory.server';
import {PhaseGameClassifier} from './core-ui/gamecache/phasegameclassifier.service';

@NgModule({
    imports: [
        BrowserModule,
        routing,
        NavigationBarModule,
        JTBCoreUIBootstrap
    ],
    declarations: [
        RootComponent,
        MainComponent
    ],
    bootstrap: [RootComponent],
    providers: [
        {provide: 'AppConfig', useClass: TwistedAppConfig},
        {provide: 'GameFactory', useClass: TSBGameFactory},
        {provide: 'GameClassifier', useClass: PhaseGameClassifier}
    ]
})
export class AppModule {
}
