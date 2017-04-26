import {AbstractTurnClassifier} from '../core-ui/gamecache/abstract-turn-classifier.service';
import {Injectable} from '@angular/core';
import {GameClassifier} from '../core-ui/gamecache/game-classifier.serviceinterface';
import {PlayerService} from '../core-ui/player/player.service';
import {MultiPlayerGame} from '../core-ui/games/multi-player-game.model';

@Injectable()
export class TSBGameClassifier extends AbstractTurnClassifier implements GameClassifier<MultiPlayerGame> {

    private md5: string = '';

    constructor(private playerService: PlayerService) {
        super();
        this.playerService.player.subscribe(p => {
            this.md5 = (p ? p.md5 : '') || '';
        });
    }

    public classifyGame(game: MultiPlayerGame): string {
        //  TODO - TSB - if this game has a setup phase
        //  TODO - TSB - other nuances in phases
        let action = game.gamePhase === 'Playing' || game.gamePhase === 'RoundOver';
        if (game.gamePhase === 'Challenged' && game.playerStates[this.md5]) {
            action = game.playerStates[this.md5] === 'Pending';
        }
        if (action) {
            return AbstractTurnClassifier.YOUR_TURN;
        }

        if (game.gamePhase === 'Declined' || game.gamePhase === 'Quit' || game.gamePhase === 'NextRoundStarted') {
            return AbstractTurnClassifier.OLDER_GAMES;
        }

        return AbstractTurnClassifier.THEIR_TURN;
    }

}

