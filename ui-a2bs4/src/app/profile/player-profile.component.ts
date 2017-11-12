import {Component} from '@angular/core';
import {PlayerService} from '../core-games-ui/player/player.service';
import {Player} from '../core-games-ui/player/player.model';

@Component({
    selector: 'player-profile',
    template: require('./player-profile.component.html'),
    styles: [require('./player-profile.component.scss').toString()]
})
export class PlayerProfileComponent {
    public player: Player;

    constructor(private playerService: PlayerService) {
        this.playerService.player.subscribe(p => {
            this.player = p;
        });
    }
}
