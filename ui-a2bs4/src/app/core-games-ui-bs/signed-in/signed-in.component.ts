import {Component} from '@angular/core';
import {PlayerService} from '../../core-games-ui/player/player.service';
import {Router} from '@angular/router';

@Component({
    selector: 'signed-in',
    template: require('./signed-in.component.html'),
})
export class SignedInComponent {
    constructor(private playerService: PlayerService, private router: Router) {
        this.playerService.loadLoggedInPlayer();
        //noinspection JSIgnoredPromiseFromCall
        this.router.navigateByUrl('/main');
    }
}
