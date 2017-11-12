import {Injectable} from '@angular/core';
import {GameFactory} from '../core-games-ui/games/gamefactory.serviceinterface';
import {TSBGame} from './tsb-game.model';

@Injectable()
export class TSBGameFactory implements GameFactory {
    public newGame(original?: any): any {
        return new TSBGame(original);
    }
}
