import {NgModule} from '@angular/core';
import {PlayerService} from './player/player.service';
import {HttpModule} from '@angular/http';

@NgModule({
    imports: [HttpModule],
    providers: [PlayerService]
})
export class JTBCoreUI {
}
