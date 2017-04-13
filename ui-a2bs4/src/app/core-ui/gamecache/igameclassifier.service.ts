import {Game} from '../games/game.model';
import {Observable} from 'rxjs';

export interface IGameClassifier {
    //  Buckets of games - aka ['Your turn', 'Their turn', 'Other']  in order of display
    //  expected to be called once
    //  can return [] if not yet initialized
    getClassifications(): Observable<string[]>;

    //  Classify game into one of the buckets returned above
    classifyGame(game: Game): string;
}
