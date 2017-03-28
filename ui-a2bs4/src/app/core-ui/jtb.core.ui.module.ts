import {NgModule} from '@angular/core';
import {PlayerService} from './player/player.service';
import {CookieService} from 'angular2-cookie/services/cookies.service';
import {HttpModule} from '@angular/http';

@NgModule({
    imports: [HttpModule],
    providers: [PlayerService, CookieService]
})
export class JTBCoreUI {
}
