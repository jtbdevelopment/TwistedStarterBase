import {Component} from '@angular/core';
import {Player, PlayerService} from 'jtb-core-games-ui';

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
