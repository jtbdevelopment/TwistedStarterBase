import {Component, OnInit} from '@angular/core';
import {BootstrapActionsService} from '../core-games-ui-bs/actions/bootstrap-actions.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Game, GameCacheService, Player, PlayerService, StandardPhases, StandardPlayerStates} from 'jtb-core-games-ui';

@Component({
    selector: 'players-and-states',
    template: require('./players-and-states.component.html'),
    styles: [require('./players-and-states.component.scss').toString()]
})
export class PlayersAndStatesComponent implements OnInit {
    public groups: string[] = [StandardPlayerStates.Pending, StandardPlayerStates.Accepted, StandardPlayerStates.Rejected, StandardPlayerStates.Quit];
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
                            displayName: this.game.players[md5],
                            playerImage: this.game.playerImages[md5],
                            playerProfile: this.game.playerProfiles[md5],
                            state: this.game.playerStates[md5]
                        };
                        this.groupPlayers[player.state].push(player);
                    }

                    this.showAccept = this.game.gamePhase === StandardPhases.Challenged && this.game.playerStates[this.player.md5] === StandardPlayerStates.Pending;
                    this.showReject = this.game.gamePhase === StandardPhases.Challenged;
                    this.showQuit = this.game.gamePhase === StandardPhases.Setup || this.game.gamePhase === StandardPhases.Playing;
                    this.showRematch = this.game.gamePhase === StandardPhases.RoundOver;
                });
            });
    }
}
