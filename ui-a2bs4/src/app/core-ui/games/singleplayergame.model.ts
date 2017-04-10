import {Game} from './game.model';

export class SinglePlayerGame extends Game {
    constructor(original?: SinglePlayerGame) {
        super(original);
    }
}