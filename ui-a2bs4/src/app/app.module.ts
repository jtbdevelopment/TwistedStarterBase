import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {TSBGameClassifier} from './game/tsb-game-classifier.service';
import {TSBGameFactory} from './game/tsb-game-factory.service';
import {TwistedAppConfig} from './app.config';
import {GameDisplayModule} from './game-display/game-display.module';
import {PlayerProfileModule} from './profile/player-profile.module';
import {CreateGameModule} from './create/create-game.module';
import {GameMenuModule} from './game-menu/game-menu.module';
import {JTBCoreGamesUIBootstrap} from 'jtb-core-games-bootstrap-ui';
import {NavigationBarModule} from './navbar/navigation-bar.module';
import {RootComponent} from './root.component';
import {MainComponent} from './main';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        NavigationBarModule,
        JTBCoreGamesUIBootstrap,
        GameMenuModule,
        CreateGameModule,
        PlayerProfileModule,
        GameDisplayModule,
        NgbModule.forRoot()
    ],
    declarations: [
        RootComponent,
        MainComponent
    ],
    bootstrap: [RootComponent],
    providers: [
        {provide: 'AppConfig', useClass: TwistedAppConfig},
        {provide: 'GameFactory', useClass: TSBGameFactory},
        {provide: 'GameClassifier', useClass: TSBGameClassifier}
    ]
})
export class AppModule {
}
