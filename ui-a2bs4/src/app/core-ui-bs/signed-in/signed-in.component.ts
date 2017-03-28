import {Component} from '@angular/core';
import {PlayerService} from '../../core-ui/player/player.service';
import {Router} from '@angular/router';
@Component({
    selector: 'signed-in',
    template: require('./signed-in.component.html'),
})
export class SignedInComponent {
    constructor(private playerService: PlayerService, private router: Router) {
        this.playerService.loadLoggedInPlayer();
        this.router.navigateByUrl('/main').then(b => {
            if (!b) {
                console.log('something went wrong with navigation');
            }
        })
    }
}
