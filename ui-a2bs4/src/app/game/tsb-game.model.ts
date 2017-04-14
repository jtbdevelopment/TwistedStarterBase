//  TODO - TSB - rename and add specific details
import {MultiPlayerGame} from '../core-ui/games/multi-player-game.model';

export class TSBGame extends MultiPlayerGame {
    constructor(original?: any) {
        super(original);
        Object.assign(this, original);
    }
}
