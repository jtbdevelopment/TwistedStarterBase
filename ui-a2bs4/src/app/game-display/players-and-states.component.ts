import {Component, OnInit} from '@angular/core';
import {BootstrapActionsService} from '../core-ui-bs/actions/bootstrap-actions.service';
import {GameCacheService} from '../core-ui/gamecache/game-cache.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Player} from '../core-ui/player/player.model';
import {PlayerService} from '../core-ui/player/player.service';
import {Game} from '../core-ui/games/game.model';

@Component({
    selector: 'players-and-states',
    template: require('./players-and-states.component.html'),
    styles: [require('./players-and-states.component.scss').toString()]
})
export class PlayersAndStatesComponent implements OnInit {
    public groups: string[] = ['Pending', 'Accepted', 'Rejected', 'Quit'];
    public groupIcons: Object = {
        Pending: 'question',
        Accepted: 'thumbs-up',
        Declined: 'thumbs-down',
        Quit: 'flag'
    };
    public showAccept: boolean = false;
    public showReject: boolean = false;
    public showQuit: boolean = false;
    public showRematch: boolean = false;
    public groupCollapsed: Object = {};
    public groupPlayers: Object = {};
    private player: Player;
    private game: Game;

    constructor(public actions: BootstrapActionsService,
                private gameCache: GameCacheService,
                private route: ActivatedRoute,
                private playerService: PlayerService) {
        this.playerService.player.subscribe(p => {
            this.player = p;
        });
        this.groups.forEach(group => {
            this.groupCollapsed[group] = false;
            this.groupPlayers[group] = [];
        });
    }

    ngOnInit() {
        this.route.paramMap
            .subscribe((params: ParamMap) => {
                this.gameCache.getGame(params.get('gameID')).subscribe(g => {
                    this.game = g;
                    this.groups.forEach(group => {
                        this.groupPlayers[group] = [];
                    });
                    for (let md5 in this.game.players) {
                        let player = {
                            current: this.player.md5 === md5,
                            id: md5,
                            displayName: this.game.players[md5],
                            playerImage: this.game.playerImages[md5],
                            playerProfile: this.game.playerProfiles[md5],
                            state: this.game.playerStates[md5]
                        };
                        this.groupPlayers[player.state].push(player)
                    }

                    this.showAccept = this.game.gamePhase === 'Challenged' && this.game.playerStates[this.player.md5] === 'Pending';
                    this.showReject = this.game.gamePhase === 'Challenged';
                    this.showQuit = this.game.gamePhase === 'Setup' || this.game.gamePhase === 'Playing';
                    this.showRematch = this.game.gamePhase === 'RoundOver';
                });
            });
    }
}
