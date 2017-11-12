import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routing} from './routes';
import {MainComponent} from './main';
import {TwistedAppConfig} from './app.config';
import {NavigationBarModule} from './navbar/navigation-bar.module';
import {JTBCoreGamesUIBootstrap} from './core-games-ui-bs/jtb.core.games.ui.bs.module';
import {RootComponent} from './root.component';
import {TSBGameFactory} from './game/tsb-game-factory.service';
import {GameMenuModule} from './game-menu/game-menu.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TSBGameClassifier} from './game/tsb-game-classifier.service';
import {PlayerProfileModule} from './profile/player-profile.module';
import {CreateGameModule} from './create/create-game.module';
import {GameDisplayModule} from './game-display/game-display.module';

@NgModule({
    imports: [
        BrowserModule,
        routing,
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
