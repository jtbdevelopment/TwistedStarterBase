import {NgModule} from '@angular/core';
import {PlayerService} from './player/player.service';
import {CookieService} from "angular2-cookie/services/cookies.service";

@NgModule({
    providers: [PlayerService, CookieService]
})
export class JTBCoreUI {
}
