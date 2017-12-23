import {NgModule} from '@angular/core';
import {JTBCoreGamesUIMessageBus} from '../messagebus/jtb.core.games.ui.messagebus.module';
import {FacebookInitializerService} from './facebook-initializer.service';
import {FacebookLoginService} from './facebook-login.service';

@NgModule({
    imports: [JTBCoreGamesUIMessageBus],
    exports: [JTBCoreGamesUIMessageBus],
    providers: [
        FacebookInitializerService,
        FacebookLoginService
    ]
})
export class JTBCoreGamesUIFacebook {
    // noinspection JSUnusedLocalSymbols
    constructor(private initializer: FacebookInitializerService) {
    }
}
