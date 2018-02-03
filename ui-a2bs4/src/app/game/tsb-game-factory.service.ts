import {Injectable} from '@angular/core';
import {TSBGame} from './tsb-game.model';
import {GameFactory} from 'jtb-core-games-ui';

@Injectable()
export class TSBGameFactory implements GameFactory {
  public newGame(original?: any): any {
    return new TSBGame(original);
  }
}
