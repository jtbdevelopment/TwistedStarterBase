import {Component} from '@angular/core';
import {Player, PlayerService} from 'jtb-core-games-ui';

@Component({
    selector: 'app-player-profile',
    templateUrl: './player-profile.component.html',
    styleUrls: ['./player-profile.component.scss']
})
export class PlayerProfileComponent {
    public player: Player;

    constructor(private playerService: PlayerService) {
        this.playerService.player.subscribe(p => {
            this.player = p;
        });
    }
}
