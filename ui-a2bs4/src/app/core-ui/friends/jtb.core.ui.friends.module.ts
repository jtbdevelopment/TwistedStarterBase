import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {JTBCoreUIMessageBus} from '../messagebus/jtb.core.ui.messagebus.module';
import {FriendsService} from './friends.service';

@NgModule({
    imports: [HttpModule, JTBCoreUIMessageBus],
    exports: [JTBCoreUIMessageBus],
    providers: [
        FriendsService
    ]
})
export class JTBCoreUIFriends {
}
