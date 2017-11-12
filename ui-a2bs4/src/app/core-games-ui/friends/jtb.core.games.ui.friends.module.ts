import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {JTBCoreGamesUIMessageBus} from '../messagebus/jtb.core.games.ui.messagebus.module';
import {FriendsService} from './friends.service';

@NgModule({
    imports: [HttpModule, JTBCoreGamesUIMessageBus],
    exports: [JTBCoreGamesUIMessageBus],
    providers: [
        FriendsService
    ]
})
export class JTBCoreGamesUIFriends {
}
