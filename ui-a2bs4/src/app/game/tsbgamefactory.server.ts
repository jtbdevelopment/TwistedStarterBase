import {IGameFactory} from '../core-ui/games/igamefactory.service';
import {TSBGame} from './tsbgame.model';
import {Injectable} from '@angular/core';

@Injectable()
export class TSBGameFactory implements IGameFactory {
    public newGame(original?: any): any {
        return new TSBGame(original);
    }
}
