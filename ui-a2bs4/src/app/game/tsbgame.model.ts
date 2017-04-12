import {MultiPlayerGame} from '../core-ui/games/multiplayergame.model';

//  TODO - TSB - rename and add specific details
export class TSBGame extends MultiPlayerGame {
    constructor(original?: any) {
        super(original);
        Object.assign(this, original);
    }
}
